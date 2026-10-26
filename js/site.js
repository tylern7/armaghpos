(() => {
  const btn = document.querySelector(".menu-btn");
  const panel = document.getElementById("mobile-nav");
  const setOpen = (open) => {
    panel.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.querySelector(".sr-only").textContent = open ? "Close menu" : "Open menu";
  };
  btn.addEventListener("click", () => setOpen(!panel.classList.contains("open")));
  panel.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));

  const links = [...document.querySelectorAll(".nav-links a")];
  const ids = links.map((a) => a.getAttribute("href").slice(1));
  const obs = new IntersectionObserver((entries) => {
    const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!hit) return;
    links.forEach((a) => a.toggleAttribute("aria-current", a.getAttribute("href") === "#" + hit.target.id));
  }, { rootMargin: "-40% 0px -50% 0px", threshold: [0.1, 0.25] });
  ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });

  const form = document.getElementById("quote-form");
  const status = document.getElementById("form-status");
  const cfg = window.ARMAGH_FORM || {};
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    data.set("_wpcf7", "2695");
    data.set("_wpcf7_version", "6.1.7");
    data.set("_wpcf7_locale", "en_US");
    data.set("_wpcf7_unit_tag", "wpcf7-f2695-p2692-o1");
    data.set("_wpcf7_container_post", "2692");
    const lines = [
      "Information request — Armagh POS",
      "First name: " + data.get("first-name"),
      "Last name: " + data.get("last-name"),
      "Company: " + data.get("company-name"),
      "Job title: " + data.get("job-title"),
      "Email: " + data.get("email"),
      "Phone: " + data.get("phone-number"),
      "City: " + data.get("city"),
      "Province: " + data.get("province"),
      "Industry: " + data.get("Industry"),
      "Business age: " + data.get("business-age"),
      "Current POS: " + data.get("current-pos"),
      "Timing: " + data.get("solution-timing"),
      "Comments: " + (data.get("comments") || ""),
    ];
    const mailto = "mailto:" + (cfg.email || "solutions@armaghpos.com") + "?subject=" + encodeURIComponent("POS information request") + "&body=" + encodeURIComponent(lines.join("\n"));
    const submit = form.querySelector('[type="submit"]');
    submit.disabled = true;
    submit.textContent = "Sending…";
    status.className = "form-status";
    status.textContent = "";
    try {
      const res = await fetch(cfg.endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      const json = await res.json().catch(() => null);
      if (res.ok && json && json.status === "mail_sent") {
        status.className = "form-status ok";
        status.textContent = "Sent. An Armagh specialist will follow up.";
        form.reset();
        return;
      }
      status.className = "form-status err";
      status.textContent = ((json && json.message) || "The form service did not accept this submission.") + " Your email app will open with the same details.";
      location.href = mailto;
    } catch (err) {
      status.className = "form-status err";
      status.textContent = "Could not reach the form endpoint. Your email app will open with the same details addressed to " + (cfg.email || "solutions@armaghpos.com") + ".";
      location.href = mailto;
    } finally {
      submit.disabled = false;
      submit.textContent = "Send";
    }
  });
})();
