---
id: 7
title: unexpected internship amidst COVID that changed my life 
createdAt: "2021-01-30 5:00:00"
tags:
  - internship
  - startup
  - bootstrap
  - lockdown
category: internship
author:
  name: karn
  twitter: gyankarn
  image: /images/bigheadkarngyan.png
description: Little did I know that this experience would be worth a thousand courses that I could have taken on any platform. Sometimes I think what if the lockdown would not have happened.
---

<p>I had just finished my two month internship at Amazon during the summer of 2020. Due to the COVID lockdown that experience was sort of a bummer. </p>
<p>I had applied for Hyderabad, home of the world&#39;s largest Amazon office but ended up working out of my 10x10 room without the company laptop, no vpn access, a shitty internet plan that lagged like Flash (The Sloth) and pushed code to a private github repository. Also don&#39;t ask me to write a blog on Amazon experience, I feel like there are enough youtube videos about it and my perspective and experience is not so much different than those.</p>
<blockquote>
<p>Although working for the richest man in the world gave me some bragging rights. (Elon went down again, right?) </p>
</blockquote>
<div class="flex items-center justify-center">
  <img class="rounded-lg" src="https://i.giphy.com/media/Lk023zZqHJ3Zz4rxtV/giphy.webp" alt="well leo" width="50%"/>
</div>
<p>Yeah so back to the story. My college had no plans to open up, later they decided to run lectures on Microsoft Teams. Let&#39;s just say I rarely went to classes when I was staying in college, so you know there was no point to waste my compute on a software like Microsoft Teams. Fired up a VM on some free GCP credits that I got from this Google SPS program, wrote a small selenium script in python that checked for active classes in all the channels and joined in to the latest lecture. Voila! Attendance sorted.</p>
<div class="breaker"></div>
<h3 id="money-can-buy-everything-true-for-college-students-">Money can buy everything (true for college students)</h3>
<p>This opened up an opportunity to make some quick bucks. I reached out to my mentors at my past firm to see if any startup had an internship opening. Luckily I got recommended to the founder of SendX, Varun Jain.</p>
<p><a href="https://sendx.io">SendX</a> is probably one of best profitable bootstrapped SaaS firm to work at in India. Hah! too many terms that I had no clue about at that point of time.</p>
<p>Varun reached out to me on LinkedIn. </p>
<div class="flex items-center justify-center">
  <img class="rounded-md" src="/images/sendpost-internship/linkedinvarun.png" alt="linkedin varun" width="80%"/>
</div>
<p>I gladly assumed he was busier than me, shared my digits and was expecting a call in the coming week. He called the same evening. We talked for an hour about my college life, work that I did at Amazon and Crio. I remember him explaining the engineering problems they had solved while developing SendX. And how a company of 8 people, and a tech team of 1.5 people had developed a successful bootstrapped company. Not kidding,  the things he said or may be the way he said them, urged an unusual desire in me to leave everything and work for him 24x7. Being a kickass CEO has it&#39;s perks I guess.</p>
<p>SendX dominantly works on a Golang backend, and I had never coded a single line of Go. Varun gave me a small project that was supposed to be a filter round to measure my skills and see if I was worth a shot.</p>
<blockquote>
<p>The project was to create a full stack app where the user has an option to enter a URL, the app should hit that url and serve the user with the html responded back with. The trick was to add a retry mechanism in cases where the request failed. Some questions needed to be answered like What if your server goes down? How do you make sure you do not miss any requests by the user? </p>
</blockquote>
<p>The implementation decisions were left on me, I could choose any programming language for the backend and frontend. I think I had 3-4 days to finish it up.</p>
<p>Obviously I had to name the project <strong>GetX</strong>. And I had to learn Go to implement the backend if I wanted to impress the guy. I was a bit familiar with React so quickly spun-up the UI. </p>
<p>Here&#39;s the UI:</p>
<div class="flex shadow-lg items-center justify-center">
  <img class="rounded-md" src="/images/sendpost-internship/getx.png" alt="getx" width="80%"/>
</div>

<div class="breaker"></div>

<p>Learning Go, that took a while. Well I googled and googled, and set up a complicated backend using Go&#39;s net/http package that had just one API with a much more complicated retry mechanism using Tickers. Had a plan to queue up the requests but couldn&#39;t implement that in time.</p>
<blockquote>
<p>Oh BTW, don&#39;t ever give up at this stage of a recruitment. I felt like it and I am glad I did not.</p>
</blockquote>
<p>Finished the project in time, polished the README (folks this is very very important, believe me) and voila! I was in. Got some pointers on the project which are still pending. </p>
<p>Then he mentioned about this new product that they were working on: <a href="https://sendpost.io">SendPost</a> which I and John (not so Senior Software Engineer <3) will be working on along with Varun. John was hired with me and we were supposed to have the onboarding together.</p>
<div class="breaker"></div>
<h3 id="do-you-get-tired-of-sitting-in-front-of-a-screen-">Do you get tired of sitting in front of a screen?</h3>
<p>I never thought I did. I have been sitting in front of a computer since I was 8 years old. </p>
<p>The onboarding session at SendPost was tiring as fuck. For one week straight we had 8 hour zoom sessions everyday with Varun and Agni (Co-Founder at SendPost) where they&#39;d pull out whiteboards and explain the architecture and the reasons why they were developing SendPost. The zero to one of the product directly from the horse&#39;s mouth. During some sessions,  Varun actually took us through every line of code that he&#39;d written for the past few months to develop SendPost. </p>
<p>I knew I was at the right place, when the founders invest so much in you. But more often than not, it gave me jitters that was I even worth the time they were spending on me. </p>
<p>Thankfully I had some experience with situations like these (feeling like an Imposter), you just need to believe in yourself that if you put in enough of your time and energy, you won&#39;t disappoint anyone (not even yourself).</p>
<div class="breaker"></div>
<h3 id="shipping-my-first-feature-at-sendpost-in-3-weeks">Shipping my first feature at SendPost in 3 weeks</h3>
<blockquote>
<p>Hey I never said what SendPost did. So, we send emails. We give you an API to send emails. We give you a kickass dashboard to monitor your emails. We give you the control over the IPs via which you send emails. And we give you 100 other features that no other product in the market is giving to you right now.</p>
</blockquote>
<p>So first feature, implement the integration layer of the platform by including Glockapps as the first integration. </p>
<blockquote>
<p>Quick primer on emails: Any email is send from an SMTP Server i.e. it has to have a Public IP. In order to regulate emails, every IP has a <a href="https://returnpath.com/sender-score/">sender score</a> associated with it and there are public blacklists which include IPs that spam a lot, based on which it&#39;s inboxing is affected.</p>
</blockquote>
<p>On SendPost users can have shared and dedicated IPs via which their emails get sent. We didn&#39;t have infra to measure sender scores and capture blacklists, but glockapps does that. So users can integrate Glockapps on SendPost and we would show that data to the user.</p>
<p>Okay if you did not get the last paragraph, google about it later. No biggie.</p>
<p>Varun followed a very cool approach to building stuff, it was an 80:20 rule. 80% of work with 20% of the effort. Because we know the last 20% of polishing work takes a hell lot of effort. </p>
<div class="breaker"></div>
<p>He laid the path for me:</p>
<h4 id="create-a-product-requirements-document-prd-">Create a Product Requirements Document (PRD).</h4>
<p>Before we write the first line of code, we need to be sure of the following things:</p>
<ul>
<li>what are we building</li>
<li>for whom are we building it</li>
<li>how is it going to look like</li>
<li>what are the must have features in phase 0</li>
<li>how are our competitors doing it</li>
<li>what would be the Go To Market (GTM) strategy </li>
</ul>
<h4 id="create-a-tech-design-doc">Create a tech design doc</h4>
<ul>
<li>Include the APIs that you&#39;ll be building</li>
<li>May be include UI mockups</li>
<li>What will be the data model like?</li>
</ul>
<p>These two document took about a week for me to write it up and get it reviewed. We used to sit and discuss about improvements and changes that could be made. Later for further features we moved to a quicker time for drafting these docs.</p>
<blockquote>
<p>Big firms take weeks to finalize the PRD , we did not have the bandwidth to do it. But being a small team this made it much easier.</p>
</blockquote>
<div class="breaker"></div>
<h4 id="write-code-that-works-and-scales">Write code that works and scales</h4>
<p>Once this was done, since glockapps did not have an sdk but just an API documentation. I moved on to writing the OpenAPI specification for the Glockapps API in order to generate a swagger client and use it with our code base. </p>
<p>Once that was done, writing APIs was a peace of cake as we had already discussed it while creating the tech design doc. Not being a frontend guy, I had to go through a few courses that Varun had bought on vueschool.io. That took a few days. </p>
<p>By the end of my 4th week at SendPost, my code was pushed from the feature branch to mainline. Ah! Cool! </p>
<div class="flex items-center justify-center">
  <img class="rounded-md" src="https://i.giphy.com/media/l2Sqb0owUC5s5tz5m/giphy.webp" alt="" width="50%"/>
</div>
<div class="breaker"></div>
<h3 id="small-teams-actually-build-big-things">You don't have to be a big team to achieve big things</h3>
<p>I then moved on to building more features on SendPost like </p>
<ul>
<li>An Incident Management CRM from ground up. </li>
<li>Designing a lot of graphics for the Send Post landing page. </li>
<li>Automating JS client generation for Frontend to consume the API. </li>
<li>Onboarding Checklist for users to get up and running quickly.</li>
<li>Adding a feature to mock email sends.</li>
<li>Wrote a python script to populate a demo account with fake data for sales calls and testing purpose.</li>
</ul>
<p>Then we also followed frameworks like BullsEye and AARRR with the sales team to figure out what to build next and what would create a bigger impact.</p>
<h3>Work was awesome! </h3>
<p>Why was I loving it? Too many reasons man. </p>
<ul>
<li>The work culture.</li>
<li>Exposure of building a product from 0 to 1.</li>
<li>Amazing holiday policies.</li>
<li>Exponential growth.</li>
<li>Every day, an evening Chai Time with everyone in the company.</li>
<li>Good enough stipend.
etc etc.</li>
</ul>
<div class="breaker"></div>
<p>Little did I know that this experience would be worth a thousand courses that I could have taken on any platform. Sometimes I think what if the lockdown would not have happened.</p>
<ul>
<li>I would be in my college.</li>
<li>Learning way less than what I did in the past 6-7 months.</li>
<li>SendPost would never have reached out to me.</li>
<li>I would not be able to call myself a Serial Software Engineer Intern (:P).</li>
<li>Wouldn&#39;t have made such good friends.</li>
</ul>
<p>Glad I got the opportunity and I decided to stick to it. Thanks for the amazing farewell guys. See you soon (finally in real life). XOXO</p>

<div class="breaker"></div>
