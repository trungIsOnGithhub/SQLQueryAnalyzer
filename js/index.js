// import executeQuery from './execute';
const condition_keyword = ["AND","OR","LIKE","ASC","DESC"];
const name_regex = new RegExp("^[_a-zA-Z][_a-zA-A0-9]*$");
let all_tables_name = [], all_columns_name = [];

const order_by_op = "τ";
const descart = " × ";
const row_condition = "σ";
const projection = "π";
const join_op = "⋈";
const group_aggre_op = "γ ";
const html_table = document.getElementById('table');
const input = document.getElementById("w3review");
const output = document.getElementById("outtext");
const tree = document.getElementById("tree");
const submit_btn = document.getElementById("submit-btn");
const indent_level = ["<br><tt>&nbsp;</tt>","<br><tt>&nbsp;&nbsp;&nbsp;</tt>","<br><tt>&nbsp;&nbsp;&nbsp;&nbsp;</tt>","<br><tt>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</tt>"]
const split1regex = /[\s\n\t]/;
const filter_empty_string = (str) => str !== "";

function get_table_type(str) {
  let cross_join_pos = str.indexOf("crossjoin");
  let has_cross_keyword = true;
  if(has_cross_keyword && cross_join_pos > 0) {
    return [0,cross_join_pos];
  }

  let on_pos = str.indexOf("on");
  let has_on_keyword = true;
  
  if(on_pos===-1) {
    return [-1,-1,-1];//error
  }

  let natural_join_pos = str.indexOf("naturaljoin");
  let has_natural_keyword = true;
  if(has_natural_keyword && natural_join_pos > 0) {
    return [0,on_pos,natural_join_pos,12,join_op];
  }

  let inner_join_pos = str.indexOf("innerjoin");
  let has_inner_keyword = true;
  if(has_inner_keyword && inner_join_pos > 0) {
    return [1,on_pos,inner_join_pos,9,'⋈i'];
  }

  let loj_join_pos = str.indexOf("leftouterjoin");
  let has_lo_keyword = true;
  if(has_lo_keyword && loj_join_pos > 0) {
    return [2,on_pos,loj_join_pos,13,'⋈oL'];
  }

  let roj_join_pos = str.indexOf("rightouterjoin");
  let has_ro_keyword = true;
  if(has_ro_keyword && roj_join_pos > 0) {
    return [3,on_pos,roj_join_pos,16,'⋈oR'];
  }

  let oj_join_pos = str.indexOf("outerjoin");
  let has_o_keyword = true;
  if(has_o_keyword && oj_join_pos > 0) {
    return [4,on_pos,oj_join_pos,9,'⋈o'];
  }

  let join_pos = str.indexOf("join");
  let has_join_keyword = true;
  if(has_join_keyword && join_pos > 0) {
    return [5,on_pos,join_pos,5,join_op];
  }

  return [6,str];
}

function handle_table_str(str, info) {//already lowercased
  if(info[0]===0) {
    let cross_join_pos = info[1];
    let lhs = str.substring(0,cross_join_pos);
    let rhs = str.substring(cross_join_pos+7);

    lhs = handle_table_str(lhs, get_table_type(lhs));
    rhs = handle_table_str(rhs, get_table_type(rhs));

    return "(" + lhs + " " + join_op + "<sub>cross</sub> " + rhs + ")";
  }
  if(info[0]>0 && info[0]<6) {
    let [dummy,on_pos,join_keyword_pos,rhs_offset,join_oper] = info;
    let lhs = str.substring(0,join_keyword_pos);
    let rhs = str.substring(join_keyword_pos+rhs_offset, on_pos);
    let cond = str.substring(on_pos+2);

    lhs = handle_table_str(lhs, get_table_type(lhs));
    rhs = handle_table_str(rhs, get_table_type(rhs));

    return "(" + lhs + " " + join_oper + "<sub>" + cond + "</sub> " + rhs +")";
  }
  console.log("lkgh;lf : "+str);
  // is table name
  if(!all_tables_name.includes(str)) all_tables_name.push(str);
  return str;
}
// function build_rela_algebra_HTML(current, to_append) {
//   // if(current === "")
//   //   { return to_append; }
//   //   console.log("cascasc");
//   return current + "<sub>" + to_append + "</sub>";
// }

function get_columns_involved(selected_cols, group_by, condition) {
  let result = [];
  let temp_arr = selected_cols.split(",");

  console.log("cac "+temp_arr[0])

  for(let index in temp_arr) {
    if( condition_keyword.includes(temp_arr[index].toUpperCase()) )
      continue;

    let dot_pos = temp_arr[index].indexOf(".");
    if(dot_pos > 0) {
      temp_arr[index] = temp_arr.substring(dot_pos+1);
    }

    let open_brack_pos = temp_arr[index].indexOf("("),
        close_brack_pos = temp_arr[index].indexOf(")");
    if(open_brack_pos > 0 && close_brack_pos > 0) {
      temp_arr[index] = temp_arr[index].substring(open_brack_pos+1, close_brack_pos);
    }

    if( name_regex.test(temp_arr[index]) && !result.includes(temp_arr[index]) )
      result.push(temp_arr[index]);
  }

  temp_arr = condition.split(split1regex);
  console.log("to the sea: "+temp_arr)
  for(let index in temp_arr) {
    if( condition_keyword.includes(temp_arr[index].toUpperCase()) )
      continue;

    let compar_list = ['=','>','<','<>'];
    for(compar of compar_list) {
      let compar_pos = temp_arr[index].indexOf(compar);
      if(compar_pos> 0) {
        temp_arr[index] = temp_arr[index].substring(0,compar_pos);
      }
    }

    let dot_pos = temp_arr[index].indexOf(".");
    if(dot_pos > 0) {
      temp_arr[index] = temp_arr.substring(dot_pos+1);
    }

    if( name_regex.test(temp_arr[index]) && !result.includes(temp_arr[index]) )
      result.push(temp_arr[index]);
  }

  temp_arr = group_by.split(",");
  for(let index in temp_arr) {
    if( condition_keyword.includes(temp_arr[index].toUpperCase()) )
      continue;

    let dot_pos = temp_arr[index].indexOf(".");
    if(dot_pos > 0) {
      temp_arr[index] = temp_arr.substring(dot_pos+1);
    }

    if( name_regex.test(temp_arr[index]) && !result.includes(temp_arr[index]) )
      result.push(temp_arr[index]);
  }

  return result;
}

function get_tables_array(query,from_pos,where_pos) {
  if(where_pos > 0) {
    console.log(query.substring(from_pos+4,where_pos).split(split1regex));
    return query.substring(from_pos+4,where_pos).split(split1regex).join("").split(",");
  }
  return query.substring(from_pos+4).split(split1regex).join("").split(",");
}
function get_tables(query,from_pos,where_pos, group_pos, order_pos) {
  let all_tables_rexp_array = get_tables_array(query,from_pos,where_pos);

  if(where_pos === -1 && group_pos > 0) all_tables_rexp_array = get_tables_array(query,from_pos,group_pos);
  else if(where_pos === -1 && order_pos > 0) all_tables_rexp_array = get_tables_array(query,from_pos,order_pos);

  let all_tables_str_local = "";
  // all_tables_rexp_array = all_tables_rexp_array.filter(filter_empty_string);

  for(let index in all_tables_rexp_array) {
    // console.log(index)
    let temp = all_tables_rexp_array[index].toLowerCase();
    let info = get_table_type(temp);
    all_tables_rexp_array[index] = handle_table_str(temp,info);
  }
  console.log(all_tables_rexp_array);

  for(let index in all_tables_rexp_array) {
    if(index == 0) {
      all_tables_str_local += all_tables_rexp_array[index];
    }
    else {
      all_tables_str_local += descart;
      all_tables_str_local += all_tables_rexp_array[index];
    }
  }

  return [all_tables_str_local,all_tables_rexp_array];
}

function get_aggregate(selected_part) {
  let aggregate = "";
  let temp_arr = selected_part.split(",");

  for(let index in temp_arr) {
    let close_bracket_pos = temp_arr[index].indexOf(")");
    if(temp_arr[index].indexOf("(") > 0 &&  close_bracket_pos > 0) {// aggregate function
      aggregate += temp_arr[index].substring(0,close_bracket_pos+1) + ", ";
    }
  }

  // console.log(aggregate)
  return aggregate;
}

function eliminate_ineed_from_query(query, lowered_query) {
  let result = '';
  let temp_i = lowered_query.indexOf('distinct');
  // console.log('(((((((((((((((((((  '+temp_i+'distinct'.length)
    console.log('(((((((((((((((((((  '+query.substring(0,temp_i))
  if(temp_i > 0) result = query.substring(0,temp_i) + query.substring(temp_i+8);
  else result = query;
  temp_i = result.toLowerCase().indexOf('limit');
  console.log(temp_i)
  if(temp_i > 0) result = result.substring(0,temp_i);
  // temp_i = lowered_query.indexOf('offset');
  // if(temp_i > 0) result = query.substring(0,temp_i) + query.substring(temp_i+'offset'.length);
  // let temp_i3 = lowered_query.indexOf('offset ');
  console.log(result)
  return result;
}

submit_btn.addEventListener("click", async () => {
  let query = input.value;

  // console.log("dsadsda  "+query)

  // CALL TO GET RESULT
  // let is_success = await executeQuery(query);
  // if(!is_success) {
  //     reset_global();
  //   output.innerHTML = '<b style="color:red;font-size:1.5em;">Please check your query Again!!!</b>';
  //   return;
  // }
  // CALL TO GET RESULT

  // bo dau cham phay neu co
  if(query.charAt(query.length-1) === ';') {
    query = query.substring(0,query.length-1);
  }

  let lower_query = query.toLowerCase();

  query = eliminate_ineed_from_query(query, lower_query);
   // console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&  |'+eliminate_ineed_from_query(query, lower_query)+'|')
  lower_query = query.toLowerCase();
  console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&  |'+lower_query+'|')

  const select_pos = lower_query.indexOf("select ");
  const from_pos = lower_query.indexOf("from ");
  const where_pos = lower_query.indexOf("where ");
  const group_pos = lower_query.indexOf("group ");
  const by_pos = lower_query.indexOf(" by ")
  const having_pos = lower_query.indexOf("having ");
  const order_pos = lower_query.indexOf("order");

  console.log(order_pos);

  // console.log(get_tables(query,from_pos,where_pos));

  const where_end_pos = (group_pos > 0 && by_pos > 0)? group_pos : (order_pos > 0)? order_pos : query.length;
  console.log(where_end_pos)
  const group_by_end_pos = (having_pos > 0)? having_pos : (order_pos > 0)? order_pos : query.length;
  const having_end_pos = (order_pos > 0)? order_pos : (order_pos > 0)? order_pos : query.length;
  const order_by_end_pos = query.length;//current ly order by is final thing we can get

  const selected_columns = query.substring(select_pos+7, from_pos).split(split1regex).join("");

  const aggregation = get_aggregate(selected_columns);

  // const selected_columns = select_part;

  let condition = "";
  let query_tokens = [];
  if(where_pos > 0) {
     query_tokens = query.substring(where_pos+6,where_end_pos).split(split1regex).filter(filter_empty_string);
    
    for(let index in query_tokens) {
      token = query_tokens[index];
      if(token === "Or" || token === "oR" || token === "or") {
        token = "OR";
      }
      if(query_tokens[index] === "AnD" || token === "And"
              || token === "and" || token === "aND") {
        query_tokens[index] = "AND";
      }
    }

    // console.log("cacaca:  "+query_tokens)

    condition = query_tokens.join(" ");
    // let temp_array = condition.toLowerCase().split("");
    // for(let index in temp_array) {
    //   if(temp_array[index] === "o" && temp_array[index+1] === "r") {
    //     temp_array[index] = " o";
    //     temp_array[index+1] = "r ";
    //   }
    //   else if(temp_array[index] === "o" && temp_array[index+1] === "r")
    // }
  }

  let group_by = "";
  if(group_pos > 0 && by_pos > 0) {
    let group_by_part = query.substring(by_pos+4,group_by_end_pos);
    // let group_by_columns_arr;
    // if(having_pos > 0)
    group_by = group_by_part.split(split1regex).filter(filter_empty_string).join("");
  }

  let having = "";
  if(having_pos > 0) {
    let having_part = query.substring(having_pos+7,having_end_pos);
    having = having_part;
  }

  let order_by_part = "";
  console.log("$$$$$$$$$$$$$$$$$$$   "+order_pos);
  if(order_pos > 0) {
    order_by_part = lower_query.substring(order_pos+8, order_by_end_pos);
  }

  let selected_tables = get_tables(query,from_pos,where_pos,group_pos,order_pos)[0];  // selected_tables += "";

  // const query_token_array = select_pos+" "+from_pos+" "+where_pos;

  all_columns_name = get_columns_involved(selected_columns, group_by, condition);

  let innerHTMLstring  = "", curr_level = 0;
  innerHTMLstring += projection + "<sub>" + selected_columns + "</sub>";
  if(having.length > 0) {
    innerHTMLstring +=  indent_level[curr_level++] + "<sub>having</sub>" + row_condition + "<sub>" + having + "</sub>";
  }
  if(aggregation.length > 0) {
    innerHTMLstring +=  indent_level[curr_level++] + "<sub>" + group_by + "</sub>" + group_aggre_op + "<sub>" + aggregation + "</sub>";
  }
  if(condition.length > 0) {
    innerHTMLstring +=  indent_level[curr_level++] + row_condition + "<sub>" + condition + "</sub>";
  }
  innerHTMLstring += indent_level[curr_level++] + "(" + selected_tables + ")";
  // innerHTMLString = build_rela_algebra_HTML(innerHTMLstring, condition);
  // innerHTMLString = build_rela_algebra_HTML(innerHTMLstring, selected_tables);
  // = projection+"<sub>"+condition+"</sub>"+"("+selected_tables+")";
  // let to_append = "uwu";
  
  // console.log(innerHTMLstring)
  output.innerHTML = innerHTMLstring;

  var query_tree_display = document.getElementById('graph');

  query_tree_display.innerHTML = "";


  // query_tree_display.innerHTML += edges[1];
  // query_tree_display.innerHTML += edges[2];
  
  let table_node_vert_offset = 0;
  curr_level = 0;
  // query_tree_display.innerHTML += get_svg_node(projection,selected_columns,curr_level++);
  if(order_by_part.length > 0) {
    table_node_vert_offset += 68;
    query_tree_display.innerHTML += edges[curr_level];
    query_tree_display.innerHTML += get_svg_node(order_by_op,order_by_part,curr_level++);
  }
  // innerHTMLstring += projection + "<sub>" + selected_columns + "</sub>";
  if(selected_columns.length > 0) {
    if (curr_level > 0) query_tree_display.innerHTML += edges[curr_level-1];

    query_tree_display.innerHTML += get_svg_node(projection,selected_columns,curr_level++);
  }
  if(having.length > 0) {
    query_tree_display.innerHTML += edges[curr_level-1];
    query_tree_display.innerHTML += get_svg_node(row_condition,having,curr_level++);
  }
  if(aggregation.length > 0) {
    table_node_vert_offset += 68;
    query_tree_display.innerHTML += edges[curr_level-1];
    query_tree_display.innerHTML += get_svg_node(group_aggre_op,aggregation,curr_level++);
  }
  if(condition.length > 0) {
    query_tree_display.innerHTML += edges[curr_level-1];
    query_tree_display.innerHTML += get_svg_node(row_condition,condition,curr_level++);
  }
  console.log("^^^^^^^^^^^^^^^^^^  |"+order_by_part)
  
  let tables_rexp_arr = get_tables(query,from_pos,where_pos,group_pos,order_pos)[1];
  console.log('RRRRRRRRRRRRRRRRR  '+typeof(tables_rexp_arr));
  console.log(get_tables(query,from_pos,where_pos))
  // tables_arr.push('dsa');
  let first_edge_table = -220;
  if(where_pos === -1) first_edge_table = -280;
  query_tree_display.innerHTML += '<g id="edge3"><path fill="none" stroke="#000000" d="M100,'+(first_edge_table+table_node_vert_offset).toString()+' 100,'+(-140+table_node_vert_offset).toString()+'"></path></g>';

  if(tables_rexp_arr.length === 1) {
    if(tables_rexp_arr[0].indexOf(join_op) > 0) {
      let length = tables_rexp_arr[0].length;
      let temp_arr = tables_rexp_arr[0].substring(1,length-1).split(' ');
      
      let end_condi_pos = temp_arr[1].indexOf('</sub>'),
          start_condi_pos = temp_arr[1].indexOf('<sub>') + 5;
      let condi = temp_arr[1].substring(start_condi_pos,end_condi_pos);
      console.log(condi)
  
      let join_oper = temp_arr[1].substring(0,start_condi_pos-5);
      console.log(join_oper)
  
      query_tree_display.innerHTML += '<g id="edge3"><path fill="none" stroke="#000000" d="M85,'+(-120+table_node_vert_offset).toString()+' 40,'+(-70+table_node_vert_offset).toString()+'"></path></g>';
      query_tree_display.innerHTML += get_svg_node_str(temp_arr[0],'','<g id="node3" class="node"><text text-anchor="middle" x="32" y="'+(-55+table_node_vert_offset).toString()+'" font-family="Times,serif" font-size="14.00" fill="#000000">', '</text></g>');
    
      query_tree_display.innerHTML += get_svg_node_str(join_oper,condi,'<g id="node3" class="node"><text text-anchor="middle" x="100" y="'+(-130+table_node_vert_offset).toString()+'" font-family="Times,serif" font-size="14.00" fill="#000000">', '</text></g>');
    
      query_tree_display.innerHTML += '<g id="edge4"><path fill="none" stroke="#000000" d="M115,'+(-120+table_node_vert_offset).toString()+' 158,'+(-70+table_node_vert_offset).toString()+'"></path></g>';
      query_tree_display.innerHTML += get_svg_node_str(temp_arr[2],'','<g id="node3" class="node"><text text-anchor="middle" x="168" y="'+(-55+table_node_vert_offset).toString()+'" font-family="Times,serif" font-size="14.00" fill="#000000">', '</text></g>');
    }
    else {
      query_tree_display.innerHTML += get_svg_node_str(tables_rexp_arr[0],'','<g id="node3" class="node"><text text-anchor="middle" x="100" y="'+(-126+table_node_vert_offset).toString()+'" font-family="Times,serif" font-size="14.00" fill="#000000">', '</text></g>');
    }
  }
  else if(tables_rexp_arr.length === 2) {
    let lhs_has_join = tables_rexp_arr[0].indexOf(join_op) > 0;
    let rhs_has_join = tables_rexp_arr[1].indexOf(join_op) > 0;

    if(lhs_has_join && rhs_has_join) {

      let length = tables_rexp_arr[0].length;
      let temp_arr = tables_rexp_arr[0].substring(1,length-1).split(' ');
      
      let end_condi_pos = temp_arr[1].indexOf('</sub>'),
          start_condi_pos = temp_arr[1].indexOf('<sub>') + 5;
      let condi = temp_arr[1].substring(start_condi_pos,end_condi_pos);
      console.log(condi)
  
      let join_oper = temp_arr[1].substring(0,start_condi_pos-5);
      console.log(join_oper);
  
      query_tree_display.innerHTML += '<g id="edge3"><path fill="none" stroke="#000000" d="M85,'+(-120+table_node_vert_offset).toString()+' 40,'+(-70+table_node_vert_offset).toString()+'"></path></g>';
      query_tree_display.innerHTML += get_svg_node_str(temp_arr[0],'','<g id="node3" class="node"><text text-anchor="middle" x="32" y="'+(-55+table_node_vert_offset).toString()+'" font-family="Times,serif" font-size="14.00" fill="#000000">', '</text></g>');
    
      query_tree_display.innerHTML += get_svg_node_str(join_oper,condi,'<g id="node3" class="node"><text text-anchor="middle" x="100" y="'+(-130+table_node_vert_offset).toString()+'" font-family="Times,serif" font-size="14.00" fill="#000000">', '</text></g>');
    
      query_tree_display.innerHTML += '<g id="edge4"><path fill="none" stroke="#000000" d="M115,'+(-120+table_node_vert_offset).toString()+' 158,'+(-70+table_node_vert_offset).toString()+'"></path></g>';
      query_tree_display.innerHTML += get_svg_node_str(temp_arr[2],'','<g id="node3" class="node"><text text-anchor="middle" x="168" y="'+(-55+table_node_vert_offset).toString()+'" font-family="Times,serif" font-size="14.00" fill="#000000">', '</text></g>');
    }
    else if(lhs_has_join) {

      let length = tables_rexp_arr[0].length;
      let temp_arr = tables_rexp_arr[0].substring(1,length-1).split(' ');
      
      let end_condi_pos = temp_arr[1].indexOf('</sub>'),
          start_condi_pos = temp_arr[1].indexOf('<sub>') + 5;
      let condi = temp_arr[1].substring(start_condi_pos,end_condi_pos);
      // console.log(condi)
  
      let join_oper = temp_arr[1].substring(0,start_condi_pos-5);
      // console.log(join_oper)
  
      query_tree_display.innerHTML += '<g id="edge3"><path fill="none" stroke="#000000" d="M85,'+(-120+table_node_vert_offset).toString()+' 40,'+(-70+table_node_vert_offset).toString()+'"></path></g>';
      query_tree_display.innerHTML += get_svg_node_str(temp_arr[0],'','<g id="node3" class="node"><text text-anchor="middle" x="32" y="'+(-55+table_node_vert_offset).toString()+'" font-family="Times,serif" font-size="14.00" fill="#000000">', '</text></g>');
    
      query_tree_display.innerHTML += get_svg_node_str(join_oper,condi,'<g id="node3" class="node"><text text-anchor="middle" x="100" y="'+(-130+table_node_vert_offset).toString()+'" font-family="Times,serif" font-size="14.00" fill="#000000">', '</text></g>');
    
      query_tree_display.innerHTML += '<g id="edge4"><path fill="none" stroke="#000000" d="M115,'+(-120+table_node_vert_offset).toString()+' 158,'+(-70+table_node_vert_offset).toString()+'"></path></g>';
      query_tree_display.innerHTML += get_svg_node_str(temp_arr[2],'','<g id="node3" class="node"><text text-anchor="middle" x="168" y="'+(-55+table_node_vert_offset).toString()+'" font-family="Times,serif" font-size="14.00" fill="#000000">', '</text></g>');
    }
    else if(rhs_has_join) {
      let length = tables_rexp_arr[0].length;
      let temp_arr = tables_rexp_arr[0].substring(1,length-1).split(' ');
      
      let end_condi_pos = temp_arr[1].indexOf('</sub>'),
          start_condi_pos = temp_arr[1].indexOf('<sub>') + 5;
      let condi = temp_arr[1].substring(start_condi_pos,end_condi_pos);
      console.log(condi)
  
      let join_oper = temp_arr[1].substring(0,start_condi_pos-5);
      console.log(join_oper)
  
      query_tree_display.innerHTML += '<g id="edge3"><path fill="none" stroke="#000000" d="M85,'+(-120+table_node_vert_offset).toString()+' 40,'+(-70+table_node_vert_offset).toString()+'"></path></g>';
      query_tree_display.innerHTML += get_svg_node_str(temp_arr[0],'','<g id="node3" class="node"><text text-anchor="middle" x="32" y="'+(-55+table_node_vert_offset).toString()+'" font-family="Times,serif" font-size="14.00" fill="#000000">', '</text></g>');
    
      query_tree_display.innerHTML += get_svg_node_str(join_oper,condi,'<g id="node3" class="node"><text text-anchor="middle" x="100" y="'+(-130+table_node_vert_offset).toString()+'" font-family="Times,serif" font-size="14.00" fill="#000000">', '</text></g>');
    
      query_tree_display.innerHTML += '<g id="edge4"><path fill="none" stroke="#000000" d="M115,'+(-120+table_node_vert_offset).toString()+' 158,'+(-70+table_node_vert_offset).toString()+'"></path></g>';
      query_tree_display.innerHTML += get_svg_node_str(temp_arr[2],'','<g id="node3" class="node"><text text-anchor="middle" x="168" y="'+(-55+table_node_vert_offset).toString()+'" font-family="Times,serif" font-size="14.00" fill="#000000">', '</text></g>');
    }
    else {
      // let length = tables_rexp_arr[0].length;
      // let temp_arr = tables_rexp_arr[0].substring(1,length-1).split(' ');
      
      // let end_condi_pos = temp_arr[1].indexOf('</sub>'),
      //     start_condi_pos = temp_arr[1].indexOf('<sub>') + 5;
      // let condi = temp_arr[1].substring(start_condi_pos,end_condi_pos);
      // console.log(condi)
  
      // let join_oper = temp_arr[1].substring(0,start_condi_pos-5);
      // console.log(join_oper)
  
      query_tree_display.innerHTML += '<g id="edge3"><path fill="none" stroke="#000000" d="M93,'+(-130+table_node_vert_offset).toString()+' 40,'+(-70+table_node_vert_offset).toString()+'"></path></g>';
      query_tree_display.innerHTML += get_svg_node_str(tables_rexp_arr[0],'','<g id="node3" class="node"><text text-anchor="middle" x="32" y="'+(-55+table_node_vert_offset).toString()+'" font-family="Times,serif" font-size="14.00" fill="#000000">', '</text></g>');
    
      query_tree_display.innerHTML += get_svg_node_str(descart,'','<g id="node3" class="node"><text text-anchor="middle" x="100" y="'+(-130+table_node_vert_offset).toString()+'" font-family="Times,serif" font-size="14.00" fill="#000000">', '</text></g>');
    
      query_tree_display.innerHTML += '<g id="edge4"><path fill="none" stroke="#000000" d="M108,'+(-130+table_node_vert_offset).toString()+' 158,'+(-70+table_node_vert_offset).toString()+'"></path></g>';
      query_tree_display.innerHTML += get_svg_node_str(tables_rexp_arr[1],'','<g id="node3" class="node"><text text-anchor="middle" x="168" y="'+(-55+table_node_vert_offset).toString()+'" font-family="Times,serif" font-size="14.00" fill="#000000">', '</text></g>');
    }
  }

  build_info_table(all_tables_name, all_columns_name)

});
let edges = [
    '<g id="edge0"><path fill="none" stroke="#000000" d="M100,-295 100,-240"></path></g>',
    '<g id="edge1"><path fill="none" stroke="#000000" d="M100,-225.3 100,-168.3"></path></g>',
    '<g id="edge2"><path fill="none" stroke="#000000" d="M100,-156.3 100,-94.3"></path></g>',
    '<g id="edge3"><path fill="none" stroke="#000000" d="M100,-136.3 100,-34.3"></path></g>'
];

let svg_subscript = [
    '<tspan dy ="5" font-size="smaller">', '</tspan>'
];

var nodes = [
    ['<g id="node0" class="node"><text text-anchor="middle" x="100" y="-302.3" font-family="Times,serif" font-size="14.00" fill="#000000">', '</text></g>'],
    ['<g id="node1" class="node"><text text-anchor="middle" x="100" y="-230.3" font-family="Times,serif" font-size="14.00" fill="#000000">', '</text></g>'],
    ['<g id="node2" class="node"><text text-anchor="middle" x="100" y="-158.3" font-family="Times,serif" font-size="14.00" fill="#000000">', '</text></g>'],
    ['<g id="node3" class="node"><text text-anchor="middle" x="100" y="-132.3" font-family="Times,serif" font-size="14.00" fill="#000000">', '</text></g>']
]

function get_svg_node(symbol, subtext, index) {
    let res =  nodes[index][0] + symbol;

    if(subtext.length > 0)
        res += svg_subscript[0] + subtext + svg_subscript[1];

    res += nodes[index][1];

    return res;
}

function get_svg_node_str(symbol, subtext, wrap1, wrap2) {
  let res =  wrap1 + symbol;

  console.log(res)

  if(subtext.length > 0)
      res += svg_subscript + subtext + svg_subscript[1];

  console.log(res)

  return res + wrap2;
}

// }
function build_info_table(all_tables_name, all_columns_name) {
  if(html_table.childElementCount > 0) html_table.removeChild(html_table.lastChild);

  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');

  table.appendChild(thead);
  table.appendChild(tbody);

  function create_row(html, left_title, array_data) {
  
    const row = document.createElement('tr');

    const row_title = document.createElement('td');
    row_title.innerHTML = left_title;
    row.appendChild(row_title);

    for(data of array_data) {
      const row_data = document.createElement('td');
      row_data.innerHTML = data;

      row.appendChild(row_data);
    }

    html.appendChild(row);
  }

  create_row(tbody, '<b>Các bảng dữ liệu được đề cập</b> ', all_tables_name);
  create_row(tbody, '<b>Các cột dữ liệu được đề cập</b>  ', all_columns_name);

  table.classList.add("table");
  table.classList.add("table-striped");

  html_table.appendChild(table);
}

function reset_global() {
  all_tables_name = [];
  all_columns_name = [];

  html_table.innerHTML = "";
  output.innerHTML = "Relational Expression Here";
  tree.innerHTML = "";
  input.value = "";
}
function display_demo(){console.log("đấ");input.value="SELECT full_name, admin_name\nFROM provinces INNER JOIN administrative_units\nON id = administrative_unit_id\nLIMIT 8;";}