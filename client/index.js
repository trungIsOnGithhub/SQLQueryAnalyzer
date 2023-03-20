const condition_keyword = ["AND","OR","LIKE","ASC","DESC"];
const name_regex = new RegExp("^[_a-zA-Z][_a-zA-A0-9]*")
let all_tables_name = [], all_columns_name = [];

const row_condition = "σ";
const projection = "π";
const join_op = "⋈";
const group_aggre_op = "γ ";
const input = document.getElementById("w3review");
const output = document.getElementById("outtext");
const tree = document.getElementById("tree");
const submit_btn = document.getElementById("submit-btn");
const indent_level = ["<br><tt>&nbsp;</tt>","<br><tt>&nbsp;&nbsp;&nbsp;</tt>","<br><tt>&nbsp;&nbsp;&nbsp;&nbsp;</tt>","<br><tt>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</tt>"]
const split1regex = /[\s\n\t]/;
const filter_empty_string = (str) => str !== "";
function get_table_type(str) {
  let natural_join_pos = str.indexOf("naturaljoin");
  let has_natural_keyword = true;
  if(has_natural_keyword && natural_join_pos > 0) {
    return [0,natural_join_pos];
  }

  let on_pos = str.indexOf("on");
  
  if(on_pos===-1) {
    return [23];
  }

  let inner_join_pos = str.indexOf("innerjoin");
  let has_inner_keyword = true;
  if(has_inner_keyword && inner_join_pos > 0) {
    return [1,on_pos,inner_join_pos];
  }

  return 'dda';
}

function handle_table_str(str, info) {//already lowercased
  if(info[0]===0) {
    let natural_join_pos = info[1];
    let lhs = str.substring(0,natural_join_pos);
    let rhs = str.substring(natural_join_pos+9);

    lhs = handle_table_str(lhs, get_table_type(lhs));
    lhs = handle_table_str(rhs, get_table_type(rhs));

    // lhs = handle_table_str(lhs);
    // rhs = handle_table_str(rhs);

    return "(" + lhs + join_op + "<sub>natural</sub> " + rhs + ")";
  }
  if(info[0]==1) {
    let inner_join_pos = info[2], on_pos = info[1];
    let lhs = str.substring(0,inner_join_pos);
    let rhs = str.substring(inner_join_pos+8, on_pos);
    let cond = str.substring(on_pos+2);

    // lhs = handle_table_str(lhs);
    // rhs = handle_table_str(rhs); 

    return "(" + lhs + " " + join_op + "<sub>" + cond + "</sub> " + rhs +")";
  }
  
  // is table name
  all_tables_name.push(str);
  return str;
}
function build_rela_algebra_HTML(current, to_append) {
  // if(current === "")
  //   { return to_append; }
  //   console.log("cascasc");
  return current + "<sub>" + to_append + "</sub>";
}

function get_columns_involved(selected_cols, group_by, condition) {
  let result = [];
  let temp_arr = selected_cols.split(",");

  console.log(temp_arr)

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

function get_tables(query,from_pos,where_pos) {
  let all_tables_array = query.substring(from_pos+4,where_pos).split(split1regex).join("").split(",");
  let all_tables_str = "";
  // all_tables_array = all_tables_array.filter(filter_empty_string);
  console.log(all_tables_array);

  for(let index in all_tables_array) {
    console.log(index)
    let temp = all_tables_array[index].toLowerCase();
    let info = get_table_type(temp);
    all_tables_array[index] = handle_table_str(temp,info);
  }

  for(let index in all_tables_array) {
    if(index == 0) {
      all_tables_str += all_tables_array[index];
    }
    else {
      all_tables_str += " × ";
      all_tables_str += all_tables_array[index];
    }
  }

  return all_tables_str;
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

//  submit_btn.addEventListener("click", () => {
  const query = input.value;

  const lower_query = query.toLowerCase();

  const select_pos = lower_query.indexOf("select ");
  const from_pos = lower_query.indexOf("from ");
  const where_pos = lower_query.indexOf("where ");
  const group_pos = lower_query.indexOf("group ");
  const by_pos = lower_query.indexOf(" by ")
  const having_pos = lower_query.indexOf("having ");
  const order_pos = lower_query.indexOf("order ");

  const where_end_pos = (group_pos > 0 && by_pos > 0)? group_pos : query.length;
  const group_by_end_pos = (having_pos > 0)? having_pos : query.length;
  const having_end_pos = (order_pos > 0)? order_pos : query.length;

  const select_part = "|"+query.substring(select_pos+7, from_pos).split(split1regex).join("")+"|";

  const aggregation = get_aggregate(select_part);

  const selected_columns = select_part;

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

    console.log("cacaca:  "+query_tokens)

    condition = "|"+query_tokens.join(" ")+"|";
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

  let selected_tables = get_tables(query,from_pos,where_pos);
  // selected_tables += "";

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
  console.log(all_tables_name);
  console.log(all_columns_name);
// });