## SQL Query Analyzer Tools

*:golf: Coursework project for "Database Management System" course **|** Semester 2022-2 **|** HCMUT*

>*This tools is made solely for purpose of learning and practicing, as there may still exists severals bugs and flaws that I am working on :grinning:*

>*As the codebase is under working, below is the tasks checklist*

##### :paperclip: To go into details:

* **Write SQL query as input to interact with a sample database**
  - ill-formed SQL query would be rejected from processing.
  - query to any object(table, columns...) which is not in sample database would also be rejected.
  - Query example:
```sql
SELECT column1, column2
FROM table1 JOIN table2 ON condition1
WHERE condition2
```
    
* **Translate input SQL query into [Relational Algebra](https://en.wikipedia.org/wiki/Relational_algebra#:~:text=In%20database%20theory%2C%20relational%20algebra,Codd.) form**
  - SQL keywords which do not have proper equivalents in Relational Algebra would be translated into custom symbols or structure.
  - ![image of a sample relational algebra expression](/img/rela_algb.jpg)
* **Translate input SQL query into Query Tree form**
  - Generated query tree is the initial tree
    - no optimization was made to query tree
  - ![image of a sample query tree](/img/query_tree.jpg)

-------------------------------------------------------
### Tasks Checklist
- [x] prepare sample database
- [x] user able to write SQL query as input
- [ ] translate into relational algebra
- [ ] translate into query tree
- [ ] connect server to database
- [ ] provide API for client page

#### awfully look code, working on it :neutral_face:
