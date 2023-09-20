import NextSelect from "./src";
import "./src/select.scss";

window.onload = function () {
  const nextSingle = document.getElementById("nextSingle") as HTMLSelectElement;
  const single = new NextSelect({
    select: nextSingle,
  });

  const nextMulti = document.getElementById("nextMulti") as HTMLSelectElement;
  const multiple = new NextSelect({
    select: nextMulti,
  });
}
