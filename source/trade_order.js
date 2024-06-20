function getColor(type) {
  if (type == "LONG") {
    return "#03FF68";
  } else return "#FF0303";
}

function getColorPnl(pnl) {
  if (pnl == '-') return
  if (pnl >= 0) {
    return "#03FF68";
  } else return "#FF0303";
}

var iconNotFollow =
  "M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z";

var iconFollow =
  "M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z";

function getIcon(is_follow) {
  if (is_follow) return iconFollow;
  else return iconNotFollow;
}

function getOpacityFollow(is_follow) {
  if (is_follow) return 1;
  else return 0.5
}

function getPnl(pnl) {
  if (pnl == '-') return "-"
  else return pnl + "%"
}

const user_id = Telegram.WebApp.initDataUnsafe.user.id
const username = Telegram.WebApp.initDataUnsafe.user.username

// const user_id = 1504776110
// const username = ""

console.log(user_id, username)

function follow(order_id) {
  if (orderIdFollow.includes(order_id)) {
    $(`#${order_id}`).html(
      `<svg xmlns="http://www.w3.org/2000/svg"
        fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="tabler-icon tabler-icon-copy"
        style="width: calc(1rem * var(--mantine-scale)); height: calc(1rem * var(--mantine-scale));"
            viewBox="0 0 576 512">
            <path fill="#FFC107"
            opacity="${getOpacityFollow(false)}"
            d="${getIcon(true)}"/>
            </svg>
        `
    );
    orderIdFollow = orderIdFollow.filter((item) => item != order_id);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {};
    xhttp.open(
      "POST",
      "https://chainstation.io/bot/unfollow-trade-order/" +
        user_id +
        "/" +
        order_id,
      true
    );
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send("Your JSON Data Here");

    alert("Bạn đã bỏ follow signal " + order_id);
  } else {
    $(`#${order_id}`).html(
      `<svg xmlns="http://www.w3.org/2000/svg"
        fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="tabler-icon tabler-icon-copy"
        style="width: calc(1rem * var(--mantine-scale)); height: calc(1rem * var(--mantine-scale));"
            viewBox="0 0 576 512">
            <path fill="#FFC107"
            opacity="${getOpacityFollow(true)}"
            d="${getIcon(true)}"/>
            </svg>
        `
    );
    orderIdFollow.push(order_id);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {};
    xhttp.open(
      "POST",
      "https://chainstation.io/bot/follow-trade-order/" +
        user_id +
        "/" +
        order_id,
      true
    );
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send("Your JSON Data Here");

    alert("Bạn đã follow signal " + order_id);
  }
}

function get_order_id(token, order_id){
  return order_id.replace(token, "")
}

var orderIdFollow = [];
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var result = JSON.parse(this.response);
    var data = result.data;
    document.querySelector("#icon-loader").style.display = "none"
    for (let i = 0; i < data.length; i++) {
      if (data[i].is_follow) {
        orderIdFollow.push(data[i].order_id);
      }
      var price = data[i].price
      var pnl = Math.round(data[i].pnl * 100 * 100) / 100;
      if (price == 0) {
        price = '-'
        pnl = '-'
      }
      const tr = `
            <tr class="bg-transparent border-b dark:border-[#353535]">
            <td class="pl-2 pr-0 text-xs pt-3.5 align-top">${i + 1}</td>
            <td class="px-2 py-2.5 align-top">
                <div class="mr-4"><span class="max-w-[90px] w-[90px] truncate block font-semibold" style="color: white">${
                  data[i].from_token
                }</span>
                  <div class="flex items-end pt-[1px]">
                  <span 
                      onclick="window.open('${
                        data[i].link_message
                      }', '_blank');"
                      class="text-xs text-gray-500 dark:text-gray-400" style="color: #0985F8">
                      ${get_order_id(data[i].from_token, data[i].order_id)}
                    </span>
                      <button
                        onClick=follow("${data[i].order_id}")
                        class="mantine-focus-auto mantine-active inline min-w-0 min-h-0 w-[16px] h-[18px] border-t-[2px] border-t-transparent m-8d3f4000 mantine-ActionIcon-root m-87cf2631 mantine-UnstyledButton-root"
                        data-variant="subtle" type="button"
                        style="--ai-bg: transparent; 
                        --ai-hover: var(--mantine-color-gray-light-hover); 
                        --ai-color: var(--mantine-color-gray-light-color); 
                        --ai-bd: calc(0.0625rem * var(--mantine-scale)) solid transparent;
                        margin-left: calc(0.5rem * var(--mantine-scale));
                        margin-bottom: calc(0.0625rem * var(--mantine-scale))
                        ">
                          <span id="${data[i].order_id}"
                            class="m-8d3afb97 mantine-ActionIcon-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                
                                fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="tabler-icon tabler-icon-copy"
                                style="width: calc(1rem * var(--mantine-scale)); height: calc(1rem * var(--mantine-scale));"
                                
                                viewBox="0 0 576 512">
                                <path 
                                fill="#FFC107",
                                opacity="${getOpacityFollow(data[i].is_follow)}"
                                d="${getIcon(true)}"/>
                                </svg>
                        </span>
                        </button>
                    </div>
                </div>
              </div>
            </td>
            <td class="px-2 py-2.5 align-top" style="color: ${getColor(
              data[i].type
            )}"><span>${data[i].entry}</span></td>
            <td class="px-2 py-2.5 align-top" id="price-${data[i].order_id}" style="color:white"><span>${price}</span></td>
            <td class="px-2 py-2.5 align-top" style="color: ${getColorPnl(
              pnl
            )}"><span>${getPnl(pnl)}</span></td>
            </tr>
            `;
      const row = $("#table-trade-order").append(tr);
    }
  }
};

xhttp.open("GET", "https://chainstation.io/bot/all-trade-order-latest/" + user_id, true);
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send("Your JSON Data Here");
