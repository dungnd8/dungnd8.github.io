function getColor(type) {
    if (type == "LONG") {
        return "#03FF68"
    }
    else return "#FF0303"
}

function getColorPnl(pnl) {
    if (pnl == '-') return
    if (pnl > 0) {
        return "#03FF68"
    }
    else return "#FF0303"
}

function getPnl(pnl) {
  if (pnl == '-') return "-"
  else return pnl + "%"
}

function getStatus(status) {
    if (status == "START") return "---"
    else return status
}

function get_order_id(token, order_id){
  return order_id.replace(token, "")
}

const user_id = Telegram.WebApp.initDataUnsafe.user.id
const username = Telegram.WebApp.initDataUnsafe.user.username

// const user_id = 1504776110
// const username = ""

console.log(user_id, username)

var orderIdFollow = []
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
        var result = JSON.parse(this.response);
        var data = result.data
        document.querySelector("#icon-loader").style.display = "none"
        for (let i=0; i < data.length; i++) {
            if (data[i].is_follow) {
                orderIdFollow.push(data[i].order_id)
            }
            var price = data[i].price
            var pnl = Math.round(data[i].pnl * 100 * 100) / 100;
            if (price == 0) {
              price = '-'
              pnl = '-'
            }
            const tr =`
            <tr class="bg-transparent border-b dark:border-[#353535]">
            <td class="pl-2 pr-0 text-xs pt-3.5 align-top">${i+1}</td>
            <td class="py-2.5 align-top" style="padding-left: 0.5rem">
                <div class="mr-2"><span class="max-w-[90px] w-[90px] truncate block font-semibold" style="color: white">${data[i].from_token}</span>
                  <div class="flex items-end pt-[1px]"><span
                  style="color: #0985F8"
                  onclick="window.open('${data[i].link_message}', '_blank');" 
                      class="text-xs text-gray-500 dark:text-gray-400">${get_order_id(data[i].from_token, data[i].order_id)}</span>
                    </div>
                </div>
              </div>
            </td>
            <td class="px-2 py-2.5 align-top" style="color: ${getColor(data[i].type)}"><span>${data[i].entry}</span></td>
            <td class="px-2 py-2.5 align-top" style="color:white"><span>${price}</span></td>
            <td class="px-2 py-2.5 align-top" style="color: ${getColorPnl(pnl)}"><span>${getPnl(pnl)}</span></td>
            <td class="px-2 py-2.5 align-top" style="color:white"><span>${getStatus(data[i].status)}</span></td>
            </tr>
            `
            const row = $('#table-trade-order').append(tr)
        }
     }
};

xhttp.open("GET", "https://chainstation.io/bot/follow-trade-order-latest/" + user_id, true);
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send("Your JSON Data Here");