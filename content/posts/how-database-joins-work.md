---
id: 3
title: Internals of SQL JOIN
createdAt: "2022-08-07 17:26:00"
tags:
  - database
  - sql
  - joins
  - hash join
category: dev
author:
  name: Madhav
  twitter: madhavkauntia
  image: /images/madhav.jpeg
description: In this article, I dive into the internals of one of the most powerful SQL operations - JOIN.
---

SQL Join is one of the most commonly used and powerful SQL operations. While a lot of engineers are aware of the operation and the different types of Joins, thanks to thousands of blog posts with Venn diagrams, very few know the internals of how Joins work. Knowing the internals of this operation can help you write more performant and faster queries and can also help you debug errors or find bottlenecks in case your database queries are working slower than expected.

In this article, we'll discuss some of the common algorithms used by databases to compute Joins. The examples use Postgres version 14.4.

### Nested Loop

As the name suggests, a _Nested Loop join_ joins two tables in a brute force fashion by using a nested loop. This algorithm finds the cartesian product of two tables by scanning the entirety of both tables. Naturally, this is the least performant algorithm which can be used to execute a Join operation. For two tables INNER and OUTER and a join predicate P, the _nested loop algortihm_ concatenates every record in OUTER with every record in INNER and filters each result record on P.

```sql
SELECT *
FROM students JOIN grades
ON True;
```

Running EXPLAIN on the above query yields the following.
![Nested Loop Join Explain](/images/nested-join.png)

Since the tables are being joined _on_ the condition _True_, every row of both the tables will be considered, which leaves no scope for pruning. So, the database has no other choice but to use the _nested loop_ algorithm to execute the Join.

### Hash Join

Let's move on to a more interesting algorithm used for Joins. If we want to join two relations (mathematical term for tables) based on the equality of a foreign key, we can use the idea of hash tables. A hash table is a very popular data structure which provides a mapping of keys to values using a technique known as **hashing**.

To join two relations using a _hash join_, the algorithm picks one of the relations and creates a hash table for it. One should note that this hash table does not exist beforehand and needs to be created, and so it carries with it a certain cost. Usually, the smaller relation is picked for this purpose as creating a hash table is an expensive process. This is because we need to loop through every value of the relation and add it to the hash table.

Once the has table is ready, we loop through the other relation. As we loop through the other relation, we check if the hash of the foreign key is present in the hash table. Average cost for this lookup will be O(1). As a result of the above operation, we create an _output relation_ which contains all the common rows in both tables which have the same foreign key.

```sql
SELECT *
FROM students JOIN grades
ON students.id = grades.student_id;
```

Running EXPLAIN on the above query yields the following.
![Hash Join](/images/hash-join.png)

While the hash join is faster than the nested loop join since it has to scan lesser number of rows, it comes with a memory cost as the hash table has to be stored in the RAM. What happens if the relation is so large that the hash table for it cannot be fit in memory? Unless someone invents a byte-addressable disk (ref [ULTRARAM](https://onlinelibrary.wiley.com/doi/10.1002/aelm.202101103)) which could be used to store the hash table on disk, this will continue to be a major limitation of hash join.

### Merge Join

As the size of the relations begin to increase, _nested loop join_ and _hash join_ become more and more inefficient. The _nested loop join_ becomes very costly for large datasets and _hash join_ might require more memory than available in the RAM. This might require the _hash join_ to create the hash table on disk and then perform expensive I/O operations to move data in and out of memory.

![There's a better way GIF](/images/better-way.gif)

**Merge Join** is the most effective of all join operators. A caveat here is that this algorithm requires all input data to be sorted. Sometimes, the extra sort operation might increase the total plan cost and in these cases, the query planner might choose the _nested loop join_ or the _hash join_.

The implementation of the merge join is very similar to the [two-pointer technique](https://www.geeksforgeeks.org/two-pointers-technique/). The algorithm starts with two pointers, each at the start of the sorted relations. Then, one by one, the join attribute of the two rows are compared and the pointers are incremented accordingly.

Here is a visual representation of the Merge Join.
![Merge Join](/images/merge-join.png)

The "Handle matching rows" operations handles the two rows based on the type of join being performed. The "Next?" row to be picked or the pointer to be incremented also depends on the type of join being performed. These operations can be different for the different types of joins like inner join, left outer join, right outer join, etc.

This was a short read on an essential database operator. If you have any doubts, inputs or feedback, feel free to reach out to me on [twitter](https://twitter.com/MadhavKauntia).

#### References

- [How Joins Work](https://www.sisense.com/blog/how-joins-work/)
- [Merge Join](https://sqlserverfast.com/epr/merge-join/)
- [The cost of Hash Tables](https://www.youtube.com/watch?v=hxdT_QgHUSg&t=46s&ab_channel=HusseinNasser)
