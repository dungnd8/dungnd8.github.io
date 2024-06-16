// function UserAction() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//          if (this.readyState == 4 && this.status == 200) {
//              alert(this.responseText);
//          }
//     };
//     xhttp.open("GET", "https://chainstation.io/bot/all-trade-order-latest", true);
//     xhttp.setRequestHeader("Content-type", "application/json");
//     xhttp.send("Your JSON Data Here");
// }

// userAction()

function getColor(type) {
    if (type == "LONG") {
        return "green"
    }
    else return "red"
}

function getColorPnl(pnl) {
    if (pnl > 0) {
        return "green"
    }
    else return "red"
}

function calcPnl(value) {
        return Math.round(value * 100)
}

function getStatus(status) {
    if (status == "START") return "---"
    else return status
}

function detailPnlDate(date) {
  window.open(`https://t.me/cashback_dungnd8_bot?start=detail_pnl_by_date_${date}`, '_blank');
}

const user_id = Telegram.WebApp.initDataUnsafe.user.id
const username = Telegram.WebApp.initDataUnsafe.user.username

console.log(user_id, username)

var orderIdFollow = []
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
        var result = JSON.parse(this.response);
        var data = result.data
        var i=0
        document.querySelector("#icon-loader").style.display = "none"
        for (const [key,value] of Object.entries( data ) ) {
            const tr =`
            <tr class="bg-transparent border-b dark:border-[#353535]">
            <td class="pl-2 pr-0 text-xs pt-3.5 align-top">${i+1}</td>
            <td class="px-2 py-2.5 align-top">
              <!-- <div class="cursor-pointer items-start m-4081bf90 mantine-Group-root"
                style="--group-gap: calc(0.0625rem * var(--mantine-scale)); --group-align: center; --group-justify: flex-start; --group-wrap: nowrap; width: calc(6.25rem * var(--mantine-scale));">
                <div class="mr-2 mt-[2px]">
                  <div class="m-e5262200 mantine-Indicator-root"
                    style="--indicator-color: var(--mantine-color-gray-filled); --indicator-size: calc(0.75rem * var(--mantine-scale)); --indicator-z-index: 10; --indicator-top: calc(0.25rem * var(--mantine-scale)); --indicator-right: calc(0.25rem * var(--mantine-scale)); --indicator-translate-x: 50%; --indicator-translate-y: -50%;">
                    <div class="TokenLogo_indicator__N1X7W m-760d1fb1 mantine-Indicator-indicator"
                      data-with-label="true" data-with-border="true"><img class="m-9e117634 mantine-Image-root"
                        src="./source/ethereum.png"
                        style="width: calc(0.625rem * var(--mantine-scale)); height: calc(0.625rem * var(--mantine-scale));">
                    </div>
                    <div class="m-f85678b6 mantine-Avatar-root"
                      style="--avatar-size: calc(1.375rem * var(--mantine-scale)); --avatar-radius: var(--mantine-radius-xl);">
                      <img class="m-11f8ac07 mantine-Avatar-image" src="./source/1975.png"></div>
                  </div>
                </div> -->
                <div class="mr-4"><span class="max-w-[90px] w-[90px] truncate block font-semibold">${key}</span>
                  <div class="flex items-end pt-[1px]"><span
                  style="color: blue;text-decoration:underline;"
                      class="text-xs text-gray-500 dark:text-gray-400"></span>
                    </div>
                </div>
              </div>
            </td>
            <td class="px-2 py-2.5 align-top" style="color: ${getColorPnl(value)}"><span>${calcPnl(value)}%</span></td>
            <td class="px-2 py-2.5 align-top">
              <span style="cursor:pointer" onClick="detailPnlDate('${key}')">
                <svg xmlns="http://www.w3.org/2000/svg" 
                fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="tabler-icon tabler-icon-copy"
                style="width: calc(1rem * var(--mantine-scale)); height: calc(1rem * var(--mantine-scale));"
                
                viewBox="0 0 1000 1000">
                <path 
                fill="#0f0f0f"
                d="M830 850H170q-8 0-14-6t-6-14V170q0-8 6-14t14-6h660q8 0 14 6t6 14v660q0 8-6 14t-14 6zM70 90v820q0 8 6 14t14 6h820q8 0 14-6t6-14V90q0-8-6-14t-14-6H90q-8 0-14 6t-6 14zm200 160h61q8 0 13.5 6t5.5 14v61q0 8-5.5 13.5T331 350h-61q-8 0-14-5.5t-6-13.5v-61q0-8 6-14t14-6zm200 0h260q8 0 14 6t6 14v61q0 8-6 13.5t-14 5.5H470q-9 0-14.5-5.5T450 331v-61q0-8 5.5-14t14.5-6zM270 450h61q8 0 13.5 5.5T350 470v60q0 9-5.5 14.5T331 550h-61q-8 0-14-5.5t-6-14.5v-60q0-9 6-14.5t14-5.5zm200 0h260q8 0 14 5.5t6 14.5v60q0 9-6 14.5t-14 5.5H470q-9 0-14.5-5.5T450 530v-60q0-9 5.5-14.5T470 450zM270 650h61q8 0 13.5 5.5T350 669v61q0 8-5.5 14t-13.5 6h-61q-8 0-14-6t-6-14v-61q0-8 6-13.5t14-5.5zm200 0h260q8 0 14 5.5t6 13.5v61q0 8-6 14t-14 6H470q-9 0-14.5-6t-5.5-14v-61q0-8 5.5-13.5T470 650z"/>
                </svg>
              </span>
            </td>
            </tr>
            `
            const row = $('#table-trade-order').append(tr)
            i += 1
        }
     }
};

xhttp.open("GET", "https://chainstation.io/bot/pnl-by-date/" + user_id, true);
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send("Your JSON Data Here");