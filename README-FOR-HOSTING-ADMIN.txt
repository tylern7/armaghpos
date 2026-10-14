ARMAGH POS — ONE-PAGE SITE
Upload notes for the hosting admin
===================================

What this is
------------
A static website: index.html, css/, js/, favicon.svg.
No WordPress, no PHP, no database. Apache can serve it as-is.

What the live site is today
---------------------------
Confirmed from armaghpos.com (October 2026):

- CMS: WordPress, with Elementor, Contact Form 7 (form ID 2695),
  Yoast SEO, Wordfence, W3 Total Cache, Smart Slider, Trustindex
- Web server: Apache
- Host: OVH, machine located in Canada
- CDN: Amazon CloudFront in front of the origin
- SSL: Let's Encrypt
- Mail: Microsoft 365 / Exchange (solutions@armaghpos.com)
- Analytics already on the old site: Google Analytics 4, Tag Manager,
  Lucky Orange, Piwik PRO. They are NOT included here. Add the existing
  Tag Manager snippet in index.html if you still want those tags.

How to upload (do this first as a preview)
------------------------------------------
1. Unzip this folder.
2. By FTP/SFTP or the OVH file manager, upload the CONTENTS
   (index.html, css, js, favicon.svg, .htaccess) into a new folder
   such as public_html/preview/
   Do not overwrite wp-admin or wp-content.
3. Open https://armaghpos.com/preview/ and review.
4. CloudFront caches HTML. If the new page does not show, purge the
   CDN cache for that path.

How to make it the homepage later
----------------------------------
This is not a WordPress theme. Dropping it into wp-content will not work.

Before replacing anything:
- Export a full WordPress backup (files + database) from OVH.
- Move the current WordPress directory aside (for example public_html_wp_backup).

Then either:
A. Point the domain's document root at this folder, or
B. Place these files in the web root so index.html is served first.
   If WordPress rewrite rules in .htaccess still send every URL to
   index.php, the old rules must be replaced with the .htaccess in
   this package. Keep a copy of the WordPress .htaccess in the backup.

After cutover, purge CloudFront again.

The contact form — read this
----------------------------
The current site's quote form is Contact Form 7, form 2695, on
/info-request/ and repeated on the homepage. Fields are unchanged:

  first-name, last-name, company-name, job-title, email, phone-number,
  city, province, Industry, business-age, current-pos (Yes/No),
  solution-timing, comments

This page posts those same names to:
  https://armaghpos.com/wp-json/contact-form-7/v1/contact-forms/2695/feedback

That endpoint only exists while WordPress is still running, and the
reCAPTCHA key on the form is locked to the armaghpos.com domain.
- Preview on armaghpos.com/preview/ while WordPress is still up:
  submissions can succeed only if Contact Form 7 accepts them without
  a browser-solved captcha. If it rejects them, the page opens the
  visitor's email app to solutions@armaghpos.com with the same fields.
- If you retire WordPress, change the endpoint in js/config.js to
  whatever replaces it (a new form service, or leave the mailto
  fallback). The email address is also in js/config.js.

There was no Calendly, Typeform, or other booking tool. "Request a
quote" on the old site is this form. Customer login is an external
portal and is linked as-is:

  https://armaghpos.myportallogin.com/

Blog "Read the full article" links point at the current WordPress
URLs. They 404 after the blog is removed. The short brief in each
panel remains on this page.

Product search on the old site (?s= & post_type=product) needed the
WordPress catalogue. It is not included.

Office
------
Armagh Cash Register Ltd.
180 Dundurn Street South, Hamilton, ON L8P 4K3
Mon–Fri 8:30 a.m.–5:30 p.m.
Toll free 1-888-528-5903
Hamilton 905-528-5903
Toronto 416-287-6048
Mississauga 905-670-0444
Brampton 905-846-9000
Niagara 905-984-8623
Kitchener–Waterloo 519-749-7052
Guelph 519-763-2431
Fax (905) 528-3394
