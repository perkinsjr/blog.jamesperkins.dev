---
layout: $/layouts/post.astro
title: How to automate your PRs
description: "When using static sites like Next, Hugo or Astro sometimes you want to use a seperate branch and then deploy it at a particular time. I have built a few automated workflows so here is how"
tags:
  - tutorial
  - devops
author: James Perkins
authorTwitter: james_r_perkins
image: https://res.cloudinary.com/dub20ptvt/image/upload/v1618489779/me_n7quph.jpg
date: 2021-10-31
---

When working on a site that requires deplyoment to be at a sepcific time or date you have a few different options that I will cover today. The first option is to use PR Scheduler which installs to your repositories and makes automation easy as writing a PR comment. The second option we are covering today is GitHub Actions to automate them.

## PR Scheduler

PR Scheduler is a GitHub integration that can be installed to your GitHub repositories. It was built by [@tomkadwill](https://twitter.com/TomKadwill) to make it easy to schedule Pull Requests, in fact I use this on my site to merge blog posts at a specific time. 

### How to install and use it

1. Open PR Scheduler's GitHub App page.

2. Click the 'Install' button

3. Select whether to install PR Scheduler on all repositories or only specific repositories. Then click 'Install'.

Now PR Schedule can now be used on your PR's and to intiaite it you do the following: 

1. Open up your PR that you want to schedule.
2. Add a new comment for example `@prscheduler 31/10/2021T14:00`
3. PR Scheduler will respond back telling you it's ready. 

![PR Scheduler](https://res.cloudinary.com/dub20ptvt/image/upload/v1635613787/PR_Scheduled_cvxyim.png)

That's it now when that times comes along, your PR will be merged. If you make a mistake with the time or date, just run the same command and it will reschedule. 

## GitHub Actions

GitHub Actions are very powerful and flexible and allow you to run all sorts of DevOps operations without needing seperate tooling.

### Creating your GitHub action

Create a file in your project called `.github/workflows/scheduler.yml` we will use this to create our actions.


There are quite a few options for GitHub actions but I actually like a prebuilt version called [`merge-schedule-action`](https://github.com/gr2m/merge-schedule-action) it takes a few different arguements and uses the date to schedule your PR:

```yml
name: Merge Schedule
on:
  pull_request:
    types:
      - opened
      - edited
      - synchronize
  schedule:
    # Check every hour.
    - cron: 0 * * * *

jobs:
  merge_schedule:
    runs-on: ubuntu-latest
    steps:
      - uses: gr2m/merge-schedule-action@v1
        with:
          merge_method: squash
          #  Time zone to use. Default is UTC.
          time_zone: "America/Los_Angeles"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

So let us breakdown what is happening here we give it a name `Merge Schedule` that triggers on pull requests that are `opened`, `edited`, `synchronize` . 

We then check every hour via a cronjob using `0 * * * *` and then we run a job called `merge_schedule`. The steps are the most important here, we tell it to use `gr2m/merge-schedule-action@v1` and tell it the merge method to use and what timezone we should be using in the example we are using `America/Los_Angeles`. 

Now we have created the Action when you create a Pull Request you need to add `/schedule YYYY-MM-DD` to your Pull Request description. At this point the Action will check all PRs until the date matches and deploy the code, if you need precise deplyoments you can use `/schedule 2019-12-31T00:00:00.000Z`. 

