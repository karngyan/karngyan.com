---
id: 6
title: google interview experience
createdAt: "2020-05-22 5:00:00"
tags:
  - interview
  - google
  - kickstart
  - story
category: interview
author:
  name: karn
  twitter: gyankarn
  image: /images/bigheadkarngyan.png
description: This story might be demoralizing for some people, but I think I just need to blab this out to the world. Also, I hope my family doesn't read this, there are things I haven't told them in here.
---

This story might be demoralizing for some people, but I think I just need to blab this out to the world. Also, I hope my family doesn't read this, there are things I haven't told them in here.

It's July end of 2019, I have just started my third year at BIT Mesra. Multiple companies are about to visit the college for placements, Full-Time Employees and Interns. I was up for internships as FTEs are for final year students. My grades are terrible, due to continuous competitive programming during my 1st and 2nd year, I wasn't sure if I'll even pass the cut-off CGPA for companies. I study for exams on the morning of the day when they're scheduled. Subjects not related to computer science are just terrible to handle. Someone please stop those!

<div class="breaker"></div>

# The Exposition

So, it's 26th July I am taking a shower listening to Diljit's songs (thanks to my roomie) and a mail pops up.

<div>
  <img class="center" src="/images/google-rejection/invite-subject.png" alt="Mail Subject" width="70%"/>
</div>

Oh, wait! You don't take your phone to the shower? Seriously, it's 2020. Alright, the subject looked weird, I thought it must be one of those Google Career Page's Push Notification. And then when I opened it with my moist hands. I was shocked, you could have knocked me down with a feather! It felt like all those missed classes were not for anything.

<div>
  <img class="center" src="/images/google-rejection/invite-mail.png" alt="Mail Content" width="70%"/>
</div>

I called up Puneet (the guy who inspires me to code {you need to find your Puneet if you want to code}), he also participates in Kickstart regularly. There was this Round B in 2019 where we both performed pretty well, my rank was 109 and I remember he was in the 50s or something. Well he got a similar mail. We both replied affirmatively to our recruiters in about 20 minutes after we had received the mail.

Honestly, I was happy here, I'm not the best coder out there I'm getting an interview opportunity off-campus, what more do you want as a student. I don't think that I was content enough to ignore the upcoming process but I was happy that hopefully, my low grades won't be an issue anymore.

<div class="breaker"></div>

# The Rising Action

In about 2 hours I got an application link with the job description, minimum and preferred qualifications, which looked very similar to any internship post of Google's career page. I had an option to choose a slot for two interviews of 45 minutes each which would take place on Google Hangout.

In 4 days, another recruiter sent me calendar invites for the interviews with google doc links where I was supposed to code. Both the interviews were one after another with a gap of 15 minutes, in about a week from now. The recruiter was helpful enough to send me multiple links and resources to study from for the interview. There were multiple youtube videos shared. The one I liked and I think is enough to understand the interview process is [this](https://youtu.be/XKu_SEDAykw).

If you're a regular competitive programmer, that video is enough to give you a gist of the interview. Just watch this one video and stop scorching the youtube and focus on your skills instead.

The fear had struck in so I found myself coding on platforms like LeetCode instead of Codeforces or CodeChef.

<div>
  <img class="center" src="https://media.giphy.com/media/AFTWK5Qo22V2g/giphy.gif" alt="Fear Friends" width="50%"/>
</div>

I thought it's better to at least have a look at these problems. Honestly, none helped. At the same time I was preparing for on-campus interviews and online rounds. I was brushing up my OS, Databases, and my Resume. Oh! I had about 5 different versions of my resume, the content was mostly the same but the design was something I never felt satisfied with.

It was 27th of July, Microsoft was the first company that arrived for placements. I cleared the online round, rejected in the group fly round. Well, I did not expect that at all, but shit happens. Goldman came cleared the online round, rejected after my first interview. Shit happens twice?

I stopped going to classes, I made up my mind that I should prepare for my Google Interview. My attendance has never been good anyways.

<div>
  <img class="center" src="https://media.giphy.com/media/PiQejEf31116URju4V/giphy.gif" alt="Code" width="50%"/>
</div>

I solved about 100 problems on leetcode in 2 or 3 days, brushed up my System Design, started practicing behavioral questions in front of the mirror.

<div class="breaker"></div>

# The Conflict

It was 6th August of 2019, my interview was scheduled from 8 PM to 8:45 and the other from 9 to 9:45. I put on a formal shirt, on my track pants, combed my hair, shaved my face. I tried to look happy and forget about my past rejections. I started waiting for the first interview to start.

I was breaking out into a cold sweat.

> Alright! Regarding the interview problems, I did not sign an NDA, but the recruiter politely asked me to keep the questions under wraps. But it's been a year now and I have decided to tell you about the questions.

The recruiter came on the call, we shared greetings and without wasting any time, he jumped onto the question. Believe me it was one of the easiest array problem. The question was something like this:

> Given two arrays representing numbers, write a function to add them. Return value was supposed to be an array representing a number. Each position will store a digit from 0-9.

He gave me a sample test case, I gave him a rough solution and asked him if I should start coding it out. He asked my preferred programming language, I went with C++. And then wrote out a pretty neat function for the solution. As recommended by many, I kept talking out loud, about my approach and the thinking.

It was O(n) solution, but we started discussing the code. I was using empace_back, he asked me the difference between a push_back and an emplace_back. I gave a one-line answer that emaplace_back lets you construct an object in-place inside the container, using any of the object’s constructors while the push_back creates a temporary object and then moves that object into the container, and hence emplace_back can be a bit faster too.

He seemed satisfied, I could have added a lot more to it but man I was nervous. Cut me some slack. And then he asked about the time complexity of the code, why push_back is O(1), I knew it was amortized O(1), due to table doubling and all but I was too afraid to use the term amortized in front of him. I wanted to redirect the interview to the things I know well.

Then he asked about my three reversals of the arrays in the code, which I did to easily calculate the sum. He wanted me to think about reducing the number of reversals. I wrote another copy of the same function with 0 reversals. I asked him if I can assume the last carry will be a non zero number very few times. He smiled and answered positively. That was it, he asked if I had any questions for him and I was way too nervous to ask any. I said No.

There, my first big mistake.

<div>
  <img class="center" src="https://media.giphy.com/media/EyRqI4ZbO7Ydy/giphy.gif" alt="Meh" width="50%"/>
</div>

The second interview, was the highlight. An awesome interviewer from New York came on the call he just had lunch. He pasted the first question on the google doc. Yeah I solved two questions in this interview.

The first was to design a time-based data structure, which would delete keys after a particular point of time. He gave me the freedom to assume certain functions like time() and then I wrote a class for the same, took me about 15 minutes to get it done. Remember I talked a lot about my thought process, he was nodding a lot. Hehe!

He was pretty satisfied with the same and dropped another question on me. The question was something like this:

> You have a wallet with a bunch of coins, you randomly take out some coins from your wallet. Give me an array of all possible sums in your hand.

It has a straight-out exponential solution. I asked what kind of code would he like, a recursive or an iterative.

<div>
  <img class="center" src="https://media.giphy.com/media/Wo0xySmBfuoMw/giphy.gif" alt="Come to Daddy" width="50%"/>
</div>

He said your preference man. I coded out an iterative solution. He was more than satisfied and asked me how would I do it recursively. I quickly wrote a function for the same, with a pretty easy base case. We had a pretty positive discussion on stack overflow due to recursion.

He cheered me up! Then we had a chat about Google's culture and what he's been up to. And this time I made sure to ask him a question that how is an intern's day like in Google. He said it depends on your team. Some interns code more than an employee, some take time to learn and then apply.

He wished me good luck and that was it. I was pretty happy with how this interview went and I think it was the reason for this:

<div>
  <img class="center" src="/images/google-rejection/hc-subject.png" alt="Mail Subject" width="50%"/>
</div>

<hr>

<div>
  <img class="center" src="/images/google-rejection/positive-hc.png" alt="Positive HC" width="70%"/>
</div>

Now it was just waiting and googling a lot about Google's hiring committee.

<div class="breaker"></div>

# The Climax

While I wait for the feedback, I was rejected from another company at college Walmart Labs. I couldn't even qualify the online round. I remember solving all the programming questions with a score of a hundred. Don't know what happened there.

Then came another big company Amazon. After all these interviews and continuous harassment. I caught a fever on the day of Amazon's online coding round and the interview was supposed to be the next day. I had no expectations from this now.

I went to our college laboratory for the online coding round which was scheduled by the placement team. The coding round happened on AMCAT. I had a high fever but this round had some really interesting sections which I may talk about on some other blog some other day.

I cleared the online round and this is me waiting for my interview:

<div>
  <img class="center" src="/images/google-rejection/fever.png" alt="Fever" width="40%"/>
</div>

Well, let's get back to Google again. This happened after a lot of emails from me asking for my status.

<div>
  <img class="center" src="/images/google-rejection/again.png" alt="Interview Again" width="90%"/>
</div>

Ahhhh!! Not another interview. And this was so close to my exams. See the thing is when I try to do things right with my college curriculum, the universe sends me towards another black hole. And I end up losing marks.

I prepared for another interview. Honestly was not confident enough, but still went through it, It was graph theory question about the number of reciprocating edges in a directed graph. I coded out an O(N log N) solution. He then went on to ask me a bunch of behavioral questions. He asked me if I could improve the time complexity of my code. Is there a more elegant solution to this? I knew there must have been a cool approach than my messy one but I just couldn't think of a better one and maybe I was satisfied with my solution. Then we discussed parallelizing the code. I did come up with an idea of a merge function but he did not ask me to code it out.

I did not expect this but may be I had a vibe this was going to happen:

<div>
  <img class="center" src="/images/google-rejection/rejected.png" alt="Interview Again" width="70%"/>
</div>

<div class="breaker"></div>

# The Falling Action & The Resolution

This pinged me a little. I felt a bit disturbed because this whole process takes a lot from you. For the whole time when I was waiting
for the HC review and the next interview, I couldn't focus on anything in my life. I was procrastinating like a pro. I'd highly not recommend it. And in moments like these, you should reach out to your family, your loved ones, your partner and that's what I did. It helped a lot.

But after rejection, I took it as a positive thing and started working harder to become a better coder. That's what life usually does right. You go down, you have nothing to lose and then you start building yourself back up.

And soon enough Crio came along the way. I started working remotely and the coding pace came back to me. I have not been practicing much on my algorithms but I started inclining towards software development. I felt like maybe that was something I was missing in my skills and projects.

<div class="breaker"></div>

Well! That's about it, I haven't thought of an ending for this blog. Usually I write the ending first. Ah! I wish all the best to anyone who reads this and my juniors who are about to face the same.

<div>
  <img class="center" src="https://media.giphy.com/media/JPsFUPp3vLS5q/giphy.gif" alt="All the best" width="50%"/>
</div>

Have a good day and please <a class="typeform-share button" href="https://karngyan.typeform.com/to/HNII0D" data-mode="drawer_left" target="\_blank">subscribe</a> dude! :)
