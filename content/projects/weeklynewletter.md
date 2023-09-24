---
id: 5
title: weekly_newsletter
description: Web Scraping to send weekly newsletters to multiple subscribers
tech: bash shell
logo: /images/newsletter.png
#website: https://karngyan.com
github: https://github.com/preyalameta02/Weekly-Newsletter
#twitter: gyankarn
---

# Wekly Newsletter

- Scrape a website and send weekly mails to multiple recipients.

- Used sed -n to clean the scraped data off the website and stored the filtered content in output.txt, Which is then used as the body of the mail.

- This task is automated using ***crontab*** and ***mailx*** services.

## Techstack
Shell Scripting (bash)
