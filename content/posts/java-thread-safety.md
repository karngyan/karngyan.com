---
id: 1
title: Spring Beans Thread Safety
createdAt: "2022-01-20 00:39:00"
tags:
  - java
  - spring
  - multithreading
category: dev
author:
  name: Madhav
  twitter: madhavkauntia
  image: /images/madhav.jpeg
description: Writing correct programs is hard, writing correct concurrent programs is harder. In this article, I discuss thread safety in Spring Boot applicationss.
---

Writing correct programs is hard, writing correct concurrent programs is harder.

A recent production issue I faced had our backend team up for three nights in a row. The backend logs showed no issues but the client side devices told another story. You see, our backend called two APIs concurrently using **CompletableFuture** and then joined the results. Somehow, different API results were getting merged together. We didn't even know if the problem was on our side, the client side or on the side of the APIs we were calling. We had no idea what was causing the issue on the first day, until a fellow engineer suggested that it might be a multithreading issue. Then, we started digging in.

I was very surprised to find out that when it came to multithreading, very few engineers (including me) knew what they were doing. As a fresher, **Thread Safety** isn't something I kept in mind while building my backend applications. Even the internet wasn't very helpful in this instance. I discovered that when it came to multithreading, like the question _"Why did you cheat on me?"_, there is no right answer. The only truth in multithreading is **State**.

In this blog post, I take you through the basics of _Thread Safety_, so that the next time you're writing a Spring Boot application or a basic Java application, you don't make silly mistakes that might keep you up for three nights in a row in the future.

Concurrent programming isn't so much about threads or locks any more than civil engineering is about rivets or I-beams. Building a bridge requires correct use of rivets and I-beams just as building concurrent programs require the correct use of threads and locks. But these are just _mechanisms_. Writing thread-safe code is all about managing access to _state_, and particularly to _shared, mutable state_.

\
**What is State?**\
In simple terms, State is the data of an object. This data is stored in state variables such an an instance or static fields.

```java
public class StateExample {
  int stateVariable1;
  static String stateVariable2;

  public static void main(String args[]) {
    return;
  }
}
```

\
**What is shared, mutable state?**\
_Shared_ implies that the variable could be accessed by multiple threads and _mutable_ simply means that its value could change during its lifetime. You can make a state immutable in Java by using the **final** keyword.

We can ensure thread safety in three ways:

- Don't share state variables across threads,
- Make the state variable immutable, or
- Use _synchronization_ whenever accessing the state variable

The following is an example of a Stateless Servlet. Since this class has no states, we can say that this class is thread-safe.

```java
public class StatelessFactorizer implements Servlet {
  public void service(ServletRequest req, ServletResponse resp) {
    someLogic();
  }
}
```

> Stateless objects are always thread-safe.

The following is an example of a class which is not thread-safe.

```java
public class UnsafeFactorizer implements Servlet {
  private long count = 0;

  public long getCount() { return count; }

  public void service(ServletRequest req, ServletResponse resp) {**
    count++;
    someLogic();
  }
}
```

This class is not thread-safe since **++count** is not atomic, which means that it does not execute as a single, indivisible operation. Two threads may simultaneously access **count**, read the value, see that it is **x** and set it to **x+1**. To make **UnsafeFactorizer** safe, we can use an atomic variable like **AtomicLong** instead of **long**.

There are also some other ways like instrinsic locking using **synchronized** blocks and methods to maintain thread-safety. However, how does this apply to Spring Boot projects? Every time we make a call to a Spring Boot application, a thread is spawned which carries out the function. If there are multiple parallel requests, multiple threads access the same beans in parallel to fetch and process the data. To understand how thread safety plays into this, we first need to understand the different scopes of a Spring bean.

- _Singleton Scope_ - The same object is returned every time it is injected. Basically, every time you use **@Autowired** to inject a bean, the same copy of the bean is returned. If multiple threads simultaneously access this bean and if this bean is unsafe, this could lead to some serious issues.
- _Prototype Scope_ - A new object is created every time it is injected.

By default, all beans in Spring are Singletons. This means that all Controllers, Components, Services, etc. are Singletons, which increases the chances of thread-safety issues if one is not careful. A good practice in Spring as mentioned in the Spring Reference documentation is:

> As a rule, use the prototype scope for all stateful beans and the singleton scope for stateless beans.

Keep in mind, stateful beans are the ones in which we have shared, mutable states. For such beans, you can modify the scope to Prototype by using the **@Scope("prototype")** annotation before the bean declaration.\
However, and this is a personal opinion, unless really needed, stick to Singleton beans. Try to either make your beans stateless or manage state in a better way. Prototype scoped beans consume more resources. According to the documentation:

> The non-singleton prototype scope of bean deployment results in the creation of a new bean instance every time a request for that specific bean is made.

> Thus, although initialization lifecycle callback methods are called on all objects regardless of scope, in the case of prototypes, configured destruction lifecycle callbacks are not called. The client code must clean up prototype-scoped objects and release expensive resources that the prototype beans hold. To get the Spring container to release resources held by prototype-scoped beans, try using a custom bean post-processor, which holds a reference to beans that need to be cleaned up.

Thus, if you want to avoid an out of memory exception, you will have to manually take care of beans destruction.

Threads are an invaluable resources which can reduce development and maintenance costs and improve the performance of complex applications. In this blog, I just mentioned some basic concepts which might help you become a better Spring backend engineer if you're just starting out.

If this helped you or if you have any feedback, do reach out to me on [Twitter](https://twitter.com/MadhavKauntia) and let me know.

### Resources

- [Java Concurrency in Practice](https://www.amazon.in/dp/B004V9OA84/ref=dp-kindle-redirect?_encoding=UTF8&btkr=1)
- [Quick Guide to Spring Bean Scopes](https://www.baeldung.com/spring-bean-scopes)
- [Spring Bean Lifecycle](https://dzone.com/articles/spring-bean-lifecycle)
