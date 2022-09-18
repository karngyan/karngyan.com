---
id: 2
title: Breaking Monoliths
createdAt: "2022-08-01 22:54:00"
tags:
  - system design
  - scale
  - web dev
category: dev
author:
  name: Madhav
  twitter: madhavkauntia
  image: /images/madhav.jpeg
description: In this article, I talk about the why's and how's of breaking a monolith into microservices.
---

[Some guy on Twitter](https://twitter.com/hkarthik/status/1535061085992067072) once said:

> The longer an engineer works in a monolith, the more they yearn to decompose it into micro-services.
> The longer an engineer works across a ton of micro-services, the more they yearn for the days of working in a monolith.
> The grass is always greener.

More often than not, there's comes a point in the lifecycle of a codebase when it needs to be broken up from a monolith to a bunch of microservices. In the initial phases of development, it's easier to simply _build_ to get to an MVP, without paying much attention to the mountain of technical debt racking up. However, there comes a tipping point when breaking the monolith becomes necessary not just to be able to manage the codebase but also to increase the overall productivity of the team.

Before we move on to why migrating from monoliths to microservices might be a good idea, let's first understand what exactly a _microservice ecosystem_ is. Microservices ecosystem is a platform of services each encapsulating a business capability. Each microservice has an independent lifecycle. A developer can build, test and deploy each microservice independently.

Why should you migrate from monoliths to microservices?

1. **Clear separation of logic** makes it easier to add new features to the overall service. Suppose you want to start consuming from a new Kafka topic, you only need to make a change in the `Consumer` microservice (which consumes from a bunch of Kafka topics and writes to a DB or performs another operation.) The service layer of your application does not require a code change.

2. **Deployments become much simpler**. You only need to deploy the microservice in which you have made the changes.

3. **Resource distribution becomes more efficient** and this might drive down the costs. Suppose your application is deployed using Kubernetes. Your service might contain certain APIs, cron jobs, consumers, etc. If you need to scale the APIs, you might do so by increasing the CPU/memory of the pods. In a monolith, these resources will then also be distributed among the other parts of the applciation like the cron jobs and consumers which do not need the additional resources.

4. **Onboarding new engineers becomes easier**. If a new engineer needs to add a certain feature, he/she might only need to understand the microservice to which the feature needs to be added. In a monolith, he/she will need to understand a much greater portion of the codebase which can be overwhelming and timne-consuming, thus decreasing the oevrall productivity of the engineer.

This is just the tip of the iceberg. Now that we have discussed the _why_, let's get to the _how_. While migrating from a monolith to microservices is a worthwhile journey, it is not an easy one. It is important to really put in some time in the planning phase to minimize problems and maximize productivity in the long term.

Following points work best for me when trying to break up a monolith:

1. **Identiification of the microservices**: The first step would be to identify the disintegration into services. These microservices need to be identified carefully. They don't necessarily have to be services. It is important to decouple capability and not the code. This could mean breaking up the codebase into services and libraries, each of which has the capability to perform an independent function.

2. **Creation of a DAO layer**: This is an optional step, but one which I find particularly useful. While breaking up a monolith, I find it helpful to create a library which contains all commons of a codebase. These include models, database schema entities, database queries, constants, repositories, etc. This layer is particularly helpful if you share the same database across multiple microservices.

3. **Making upgrades**: Once the monolith is decomposed into microservices, it becomes much easier to upgrade the services to use the latest frameworks and technologies. The other microservices only care about the final response/function of the other microservice, and this abstraction gives you full liberty to make required updates. Very recently, a [Spring RCE Vulnerability](https://spring.io/blog/2022/03/31/spring-framework-rce-early-announcement) was identified and I had to make the required fix in two applications, one monolith and the other built using the microservices architecture. While it was a breeze to make the fix in the microservices, the monolith took me hours of debugging and banging my head to fix. Lesson learnt.

4. Perform **load testing** or other kinds of testing and identify the amount of resources to provide each microservice.

While braaking a monolith is a long term, time consuming task, it is well worth it, in my opinion. These were a few of my thoughts based on my brief experience as a software engineer. If you have an improved approach, or any feedback on my approach, please let me know.
