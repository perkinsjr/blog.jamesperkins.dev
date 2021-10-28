---
layout: $/layouts/post.astro
title: How to open a link in a new tab
description: "Next Link has made links easier for developers, but what if you need to open a external link in a new tab?"
tags:
  - tutorial
  - nextjs
author: James Perkins
authorTwitter: james_r_perkins
date: 2021-10-29
---

Next Link is one of my favorite features of Next.js, when it launched I was impressed with the team over Vercel when they handled internal versus external links. 

## The Problem

Next Link wraps an `a` when using a link and you pass the `href` along so where does the target="_blank" go? Here is an example of Next Link:

```javascript
<Link href={url}>
  <a>Click this link</a>
</Link>
```

## The Solution

The solution is to keep the actions on the `a` tag, and the `href` on the `Link` so it plays nicely with CSR (Client side routing) for example:

```javascript
<Link href={url}>
  <a target="_blank">Click this link</a>
</Link>
```

