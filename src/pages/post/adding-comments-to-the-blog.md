---
layout: $/layouts/post.astro
title: Adding Comments To My Blog
date: 2021-07-17
image: https://images.unsplash.com/photo-1589409514187-c21d14df0d04?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80
author: James Perkins
authorTwitter: james_r_perkins
category: tutorials
tags:
  - nextjs
description: Comments are important to a blog, people love to engage but I did not want to pay for a service, or invade my readers with ads or tracking.
---

Comments are important to a blog, people love to engage but I did not want to pay for a service, or invade my readers with ads or tracking everything they do. I want to improve the quality of the blog and comments felt like the right direction, allowing people to commment and let me know how they felt about each post.

## What did I pick?

I chose Utteranc which is a lightweight comments widget built on GitHub issues. It uses GitHub to allow people to comment on a blog post, they just sign in with the GitHub and can comment away.

### Why did I pick Utteranc?

1. It's 100% open source
2. No ads, no tracking
3. Git backed (Means I keep the comment data)
4. Extremely lightweight

### How Did I implement this on NextJS?

I decided to go with a hook that is referenced in a component. I could of just implemented an async script but where is the fun in that?

Below is the hook code:

```javascript
import { useEffect } from "react";

export const useUtterances = (commentNodeId) => {
  useEffect(() => {
    const scriptParentNode = document.getElementById(commentNodeId);
    if (!scriptParentNode) return;
    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.setAttribute("repo", "REPO_NAME");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("label", "comment :speech_balloon:");
    script.setAttribute("theme", "github-light");
    script.setAttribute("crossorigin", "anonymous");

    scriptParentNode.appendChild(script);

    return () => {
      // cleanup - remove the older script with previous theme
      scriptParentNode.removeChild(scriptParentNode.firstChild);
    };
  }, [commentNodeId]);
};
```

This creates a script that is async and fills in all the important pieces needed to make it work with utterance. This is also extendable so technically I could implement useState and change the theme based upon dark or light mode.

The component then takes the hook and then returns an div ready for comments:

```javascript
import { useUtterances } from "../lib/useUtterances";

const commentNodeId = "comments";

const Comments = () => {
  useUtterances(commentNodeId);
  return <div id={commentNodeId} />;
};

export default Comments;
```

Now I can reference it anywhere in my application and it will show up using `<Comments/>`
