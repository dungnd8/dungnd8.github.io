// function UserAction() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//          if (this.readyState == 4 && this.status == 200) {
//              alert(this.responseText);
//          }
//     };
//     xhttp.open("GET", "https://14.225.44.34:9090/bot/all-trade-order-24h", true);
//     xhttp.setRequestHeader("Content-type", "application/json");
//     xhttp.send("Your JSON Data Here");
// }

// userAction()

function getColor(type) {
    if (type == "LONG") {
        return "blue"
    }
    else return "red"
}

function getColorPnl(pnl) {
    if (pnl > 0) {
        return "green"
    }
    else return "red"
}

function calcPnl(type, entry, price) {
    if (type == "LONG") {
        return Math.round(- (entry - price) * 100 / entry)
    }
    else return Math.round((entry - price) * 100 / entry)
}

function getStatus(status) {
    if (status == "START") return "---"
    else return status
}

var orderIdFollow = []
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
        var result = JSON.parse(this.response);
        var data = result.data
        console.log(data.length)
        for (let i=0; i < data.length; i++) {
            if (data[i].is_follow) {
                orderIdFollow.push(data[i].order_id)
            }
            var pnl = calcPnl(data[i].type, data[i].entry, 0.5)
            const tr =`
            <tr onclick="window.open('${data[i].link_message}', '_blank');" class="bg-transparent border-b dark:border-[#353535]">
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
                <div class="mr-4"><span class="max-w-[90px] w-[90px] truncate block font-semibold">${data[i].from_token}</span>
                  <div class="flex items-end pt-[1px]"><span
                      class="text-xs text-gray-500 dark:text-gray-400">${data[i].order_id}</span>
                    </div>
                </div>
              </div>
            </td>
            <td class="px-2 py-2.5 align-top" style="color: ${getColor(data[i].type)}"><span>${data[i].entry}</span></td>
            <td class="px-2 py-2.5 align-top"><span>${0.5}</span></td>
            <td class="px-2 py-2.5 align-top" style="color: ${getColorPnl(pnl)}"><span>${pnl}%</span></td>
            <td class="px-2 py-2.5 align-top"><span>${getStatus(data[i].status)}</span></td>
            </tr>
            `
            const row = $('#table-trade-order').append(tr)
        }
     }
};

xhttp.open("GET", "https://14.225.44.34:9090/bot/follow-trade-order-24h", true);
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send("Your JSON Data Here");