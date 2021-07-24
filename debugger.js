(() => {
  let target = null;
  let keyDown = false;

  const info = document.createElement("div");

  info.className = "layout-debugger-info";
  document.body.appendChild(info);

  const enable = (em) => {
    if (keyDown) {
      em.classList.add("layout-debugger-target-active");
    }

    const rect = em.getBoundingClientRect();

    info.innerHTML = `<b>${parseInt(rect.width)}</b> x <b>${parseInt(
      rect.height
    )}</b>`;
  };

  const disable = (em) => {
    em.classList.remove("layout-debugger-target-active");

    info.innerHTML = "";
  };

  document.body.addEventListener("mousemove", (e) => {
    if (!target) {
      enable((target = e.target));
    } else {
      if (target !== e.target) {
        disable(target);
        enable((target = e.target));
      }
    }
  });

  document.onkeydown = (e) => {
    if (e.keyCode === 17 || e.keyCode === 91) {
      keyDown = true;

      info.className = "layout-debugger-info layout-debugger-info-active";

      if (target) {
        target.classList.add("layout-debugger-target-active");
      }
    }
  };

  document.onkeyup = () => {
    keyDown = false;

    info.className = "layout-debugger-info";

    if (target) {
      target.classList.remove("layout-debugger-target-active");
    }
  };
})();
