# Is Hanukkah Today?

This is the source code for [Is Hanukkah Today?](https://ishanukkah.today), a website that lets you know whether today is a day of Hanukkah.

## Why?
It's mostly just an excuse to buy a clever domain name and to learn a bunch of things (Hugo, Go, npm, yarn, gulp, and Tailwind CSS's new v4 alpha).

## Implementation
IHT is a dynamically-generated static site. The static site is powered by [Hugo](https://gohugo.io) and hosted by [DigitalOcean](https://digitalocean.com). Whenever the site is built, it runs a [Go](https://go.dev) script to grab the dates of this year's Hanukkah from the [Hebcal](https://www.hebcal.com/home/developer-apis) API and updates the config file. The site is rebuilt every morning at 1am EST via a call to the DigitalOcean API from [cron-job.org](https://cron-job.org).
