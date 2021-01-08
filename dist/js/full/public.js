/**
 * (c) Daniil Agniashvili
 * daniilak.ru
 * Лицензия MIT
 */

function getMenu() {
  if (localStorage.getItem("menuOpen") && localStorage.getItem("version")) {
    if (localStorage.getItem("version") == version) {
      renderMenu(JSON.parse(localStorage.getItem("menuOpen")));
      return;
    }
  }
  localStorage.clear();
  getJSON("/api/menu/getOpen", null, menu => {
    localStorage.setItem("version", 10);
    localStorage.setItem("menuOpen", JSON.stringify(menu));
    renderMenu(menu);
  });
}

function renderMenu(menu) {
  let menuDiv = document.getElementById("menu");
  let locationPath = window.location.pathname.split("/")[1];
  menu.forEach(menuElem => {
    menuDiv.appendChild(
      cEl(
        "li",
        {
          class: `nav-item ${
            locationPath == menuElem.url.split("/")[1] ? "active" : ""
          }`
        },
        cEl(
          "a",
          [{ class: "nav-link" }, { href: menuElem.url }],
          [
            menuElem.icon.length > 0
              ? cEl("i", [
                  { class: `fa fa-${menuElem.icon}`, "aria-hidden": "true" }
                ])
              : menuElem.text,
            cSpan({ class: "sr-only" })
          ]
        )
      )
    );
  });
}

let auth = 0;
function getEvents() {
  remove(".timeline.events-list");
  let sendingData = new FormData();
  sendingData.append("conf_id", conf_id);
  sendingData.append("filter_fac", document.querySelector(".filter_fac").value);
  sendingData.append(
    "filter_type",
    document.querySelector(".filter_type").value
  );
  sendingData.append(
    "filter_search",
    document.querySelector(".filter_search").value
  );
  sendingData.append("filter_for", document.querySelector(".filter_for").value);
  let month = [
    "",
    "янв.",
    "фев.",
    "мар.",
    "апр.",
    "мая",
    "июн.",
    "июл.",
    "авг.",
    "сен.",
    "окт.",
    "нояб.",
    "дек."
  ];
  getJSON("/api/auth/getAll", null, authD => {
    auth = authD.role;
    getJSON("/api/events/getAllByGroupDate", sendingData, data => {
      remove(".render-loader");

      containerFluid.children[containerFluid.children.length - 1].appendChild(
        cEl("ul", { class: "timeline events-list" })
      );
      let container = document.querySelector(".events-list");

      if (data.length != 0) {
        for (key in data) {
          let l = key.split(/[-]/);
          container.appendChild(
            cEl(
              "li",
              { class: "time-label" },
              cSpan(
                { class: "bg-green" },
                `${l[2]} ${month[parseInt(l[1])]} ${l[0]}`
              )
            )
          );
          data[key].forEach(dataEl => {
            container.appendChild(renderBlockEvent(dataEl));
          });
        }
      } else {
        container.appendChild(
          cDiv(
            { class: "col-12 col-sm-12 col-md-12" },
            cDiv(
              { class: "card bg-light" },
              cDiv(
                { class: "card-header row text-muted" },
                cEl("div", { class: "col-md-6" }, "Похоже ничего не найдено!")
              )
            )
          )
        );
      }
    });
  });
}
function getActiveConf() {
  if (
    localStorage.getItem("conf_id") &&
    localStorage.getItem("conf_name") &&
    localStorage.getItem("version")
  ) {
    if (localStorage.getItem("version") == version) {
      conf_name = localStorage.getItem("conf_name");
      conf_id = localStorage.getItem("conf_id");
      window.load[4] = true;
      return;
    }
  }
  httpPost("/api/conf/getActive").then(
    response => {
      conf_id = Number(JSON.parse(response).ID);
      localStorage.setItem("conf_id", conf_id);
      conf_name = JSON.parse(response).name_event;
      localStorage.setItem("conf_name", conf_name);
      window.load[4] = true;
    },
    error => alert(`Rejected: ${error}`)
  );
}

function renderSearchEventBlock() {
  let optionsFacs = [new Option("Все факультеты", 1)];
  let optionsFacsForAdd = document.querySelector('[name="add-event-fac"]');

  let cookieFac = getCookie("filter_fac") || 0;
  facs.forEach(f => {
    if (f.ID != 1) {
      optionsFacs.push(
        new Option(
          f.full_name,
          f.ID,
          cookieFac == f.ID ? true : false,
          cookieFac == f.ID ? true : false
        )
      );
      optionsFacsForAdd.add(new Option(f.full_name, f.ID));
    }
  });

  document.querySelector('[name="add-event-fac"]').options = optionsFacsForAdd;

  let optionsTypes = [new Option("Все типы", 0)];
  let optionsTypesForAdd = document.querySelector('[name="add-event-type"]');
  let cookieType = getCookie("filter_type") || 0;
  eventTypes.forEach(f => {
    optionsTypes.push(
      new Option(
        f.type,
        f.ID,
        cookieType == f.ID ? true : false,
        cookieType == f.ID ? true : false
      )
    );
    optionsTypesForAdd.add(new Option(f.type, f.ID));
  });

  document
    .querySelector('[name="add-event-conf-id"]')
    .add(new Option(conf_name, conf_id));

  containerFluid.appendChild(
    cDiv({ class: "col-md-3" }, [
      cEl("h4", { class: "form-group row" }, "Фильтр:"),
      cDiv({ class: "form-group row" }, [
        cEl("label", null, "Искать:"),
        cEl("input", [
          { oninput: "onchangeFilterSearch()" },
          { class: "form-control boxed filter_search" },
          { placeholder: "Начните вводить..." }
        ])
      ]),
      cDiv({ class: "form-group row" }, [
        cEl("label", null, "Факультет:"),
        cEl(
          "select",
          [
            { onchange: "onchangeFilterFac()" },
            { class: "form-control boxed filter_fac" }
          ],
          optionsFacs
        )
      ]),
      cDiv({ class: "form-group row" }, [
        cEl("label", null, "Тип мероприятия:"),
        cEl(
          "select",
          [
            { onchange: "onchangeFilterType()" },
            { class: "form-control boxed filter_type" }
          ],
          optionsTypes
        )
      ]),
      cDiv({ class: "form-group row" }, [
        cEl("label", null, "Для кого:"),
        cEl(
          "select",
          [
            { onchange: "onchangeFilterFor()" },
            { class: "form-control boxed filter_for" }
          ],
          new Option("--не выбрано--", "0")
        )
      ])
    ])
  );
  var $select = $(".filter_for");
  who.forEach(w => {
    var group = $('<optgroup label="' + w.text + '" />');
    w.children.forEach(h => {
      $("<option />")
        .val(h.id)
        .html(h.text)
        .appendTo(group);
    });
    group.appendTo($select);
  });
  containerFluid.appendChild(cDiv({ class: "col-md-9" }));
}

function renderBlockEvent(data) {
  let t = data["datetime"].split(/[- :]/);
  let loc = data["location"].split(/[-]/);
  if (loc.length == 2)
    data["location"] = `Корпус «${loc[0]}» аудитория «${loc[1]}»`;
  let pos_1 = "";
  let pos_2 = "";
  positions.forEach(p => {
    if (p.ID == Number(data["m1"]["id_position"])) pos_1 = p.name;
    if (p.ID == Number(data["m2"]["id_position"])) pos_2 = p.name;
  });
  return cEl("li", null, [
    cDiv(
      [
        { class: "timeline-item DivIdToPrint" },
        { id: `DivIdToPrint_${data["ID"]}` }
      ],
      [
        cSpan({ class: "time bg-purple" }, [
          cEl("i", { class: "fa fa-clock-o" }),
          `${t[3]}:${t[4]}`
        ]),
        cEl(
          "h2",
          { class: "timeline-header text-light-blue" },
          cEl("b", null, `«` + data["name"] + `»`)
        ),
        cDiv({ class: "timeline-body row" }, [
          cDiv({ class: "col-md-4 border-right" }, [
            cEl("p", { class: "timeline-header" }, [
              cEl("i", { class: "fa fa-fw fa-exclamation" }),
              eventTypes[Number(data["id_type_section"]) - 1].type_n
            ]),
            cEl("i", { class: "fa fa-fw fa-graduation-cap" }),
            facs[Number(data["id_fac"] - 1)].full_name,
            cEl("p"),
            cEl("p", { class: "timeline-header" }, [
              cEl("i", { class: "fa fa-fw fa-map-marker" }),
              data["location"]
            ])
          ]),
          cDiv({ class: "col-md-4 border-right" }, [
            cEl(
              "p",
              { class: "timeline-header" },
              `Председатель: ${
                data["m1"]["fio"].length > 5
                  ? data["m1"]["fio"] + ", " + pos_1.toLowerCase()
                  : "ещё не выбран"
              }`
            ),
            cEl(
              "p",
              { class: "timeline-header" },
              `Секретарь: ${
                data["m2"]["fio"].length > 5
                  ? data["m2"]["fio"] + ", " + pos_2.toLowerCase()
                  : "ещё не выбран"
              }`
            ),
            cEl(
              "p",
              { class: "timeline-header" },
              data.phone.length > 0 ? data.phone : ""
            )
          ]),
          cDiv({ class: "col-md-4" }, [
            cEl(
              "button",
              [
                { type: "button" },
                { id: "openModal" },
                { "data-target": "#openSend" },
                { "data-toggle": "modal" },
                { "data-idsec": data["ID"] },
                { onclick: "idsec = " + data["ID"] + ";" },
                { class: "btn btn-success btn-block" }
              ],
              "Подать заявку"
            ),
            cEl(
              "button",
              [
                { type: "button" },
                { onclick: `geListMembers(0, ${data["ID"]}, this);` },
                { class: "btn btn-warning btn-block" }
              ],
              "Показать список участников"
            ),
            auth == 0
              ? cEl("p")
              : cEl(
                  "a",
                  [
                    { role: "button" },
                    { href: `/event/${data["ID"]}` },
                    { class: "btn btn-warning btn-block" }
                  ],
                  "Редактировать в АИС"
                ),
            cEl(
              "button",
              [
                { type: "button" },
                { style: "display:none" },
                { "data-print": data["ID"] },
                { onclick: `printDiv('DivIdToPrint_${data["ID"]}');` },
                { class: "btn btn-info btn-block" }
              ],
              "Печать"
            )
          ]),
          data.description.length > 0 ? data.description : ""
        ]),
        cDiv([
          { class: "timeline-footer" },
          { "data-footer": data["ID"] },
          { style: "display:none;" }
        ])
      ]
    )
  ]);
}

function geListMembers(isCloseHide, id, el) {
  let footer = document.querySelector('[data-footer="' + id + '"]');
  let print = document.querySelector('[data-print="' + id + '"]');

  if (isCloseHide == 0) {
    el.setAttribute("onclick", `geListMembers(1, ${id}, this);`);
    el.innerText = "Скрыть список участников";
    let sendingData = new FormData();
    sendingData.append("id", id);
    getJSON("/api/requests/getList", sendingData, data => {
      footer.innerHTML = data.data;
    });

    footer.style.display = "";
    print.style.display = "";
  } else {
    el.innerText = "Показать список участников";
    el.setAttribute("onclick", `geListMembers(0, ${id}, this);`);
    footer.innerHTML = "";
    footer.style.display = "none";
    print.style.display = "none";
  }
}

let leaderID = 0;
function addLeader() {
  let a = document.querySelector(".leader_block");
  a.appendChild(
    cDiv({ class: `leader_block${leaderID}` }, [
      cDiv({ class: `form-group row` }, [
        cDiv(
          { class: "col-md-4" },
          cEl("input", [
            { type: "text" },
            { "data-leader-val": leaderID },
            { "data-leader-type": "lN" },
            { class: "form-control" },
            { placeholder: "Фамилия" }
          ])
        ),
        cDiv(
          { class: "col-md-4" },
          cEl("input", [
            { type: "text" },
            { class: "form-control" },
            { "data-leader-val": leaderID },
            { "data-leader-type": "fN" },
            { placeholder: "Имя" }
          ])
        ),
        cDiv(
          { class: "col-md-4" },
          cEl("input", [
            { type: "text" },
            { class: "form-control" },
            { "data-leader-val": leaderID },
            { "data-leader-type": "mN" },
            { placeholder: "Отчество" }
          ])
        )
      ]),
      cDiv({ class: `form-group row ` }, [
        cDiv(
          [{ class: "col-md-8" }],
          cDiv({ class: "form-group" }, [
            cEl(
              "select",
              [
                { class: "form-control" },
                { "data-leader-val": leaderID },
                { "data-leader-type": "pos" }
              ],
              positions.map(f => {
                return new Option(f.name, f.ID);
              })
            )
          ])
        ),
        cDiv(
          { class: "col-md-2" },
          cDiv(
            { class: "btn-group btn-group-sm" },
            cEl(
              "a",
              [
                { class: "btn btn-danger" },
                {
                  onclick: `document.querySelector('.leader_block${leaderID++}').remove();`
                }
              ],
              cEl("i", { class: "fa fa-times" })
            )
          )
        )
      ])
    ])
  );
}

function printDiv(divName) {
  var printContents = document.getElementById(divName).innerHTML;
  var originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;

  window.print();

  document.body.innerHTML = originalContents;
}

let memberID = 0;
function update_inst(id, el) {
  let row = el.parentNode.parentNode.parentNode.children;
  if (el.value == 0) {
    row[2].style.display = "";
    row[3].style.display = "";
    row[4].style.display = "none";
    row[5].style.display = "none";
    row[6].style.display = "none";
    row[7].style.display = "none";
    row[8].style.display = "none";
    row[6].children[0].children[0].value = "Чебоксары";
    row[7].children[0].children[0].value = "ФГБОУ ВО «ЧГУ им. И.Н. Ульянова»";
  } else {
    row[2].style.display = "none";
    row[3].style.display = "none";
    row[4].style.display = "";
    row[5].style.display = "";
    row[6].style.display = "";
    row[7].style.display = "";
    row[8].style.display = "";
  }
  return;
}
function sendZ() {
  let name_project = document.querySelector("#add-event-name").value;
  let members = [];
  for (i = 0; i < memberID; i++) {
    if (document.querySelector(`[data-mem-val="${i}"][data-mem-type="inst"]`)) {
      if (
        document.querySelector(`[data-mem-val="${i}"][data-mem-type="lN"]`)
          .value.length == 0
      ) {
        alert("Не все заполнены поля");
        return;
      }
      members.push({
        inst: document.querySelector(
          `[data-mem-val="${i}"][data-mem-type="inst"]`
        ).value,
        lN: document.querySelector(`[data-mem-val="${i}"][data-mem-type="lN"]`)
          .value,
        num: document.querySelector(
          `[data-mem-val="${i}"][data-mem-type="num"]`
        ).value,
        fN: document.querySelector(`[data-mem-val="${i}"][data-mem-type="fN"]`)
          .value,
        mN: document.querySelector(`[data-mem-val="${i}"][data-mem-type="mN"]`)
          .value,
        city: document.querySelector(
          `[data-mem-val="${i}"][data-mem-type="city"]`
        ).value,
        n_o: document.querySelector(
          `[data-mem-val="${i}"][data-mem-type="n_o"]`
        ).value,
        phone: document.querySelector(
          `[data-mem-val="${i}"][data-mem-type="phone"]`
        ).value,
        b: document.querySelector(
          `[data-mem-val="${0}"][data-mem-type="b"]:checked`
        ).value
      });
    }
  }
  if (members.length == 0 || name_project.length == 0) {
    alert("Пустая заявка");
    return;
  }
  let leaders = [];
  for (i = 0; i < leaderID; i++) {
    if (
      document.querySelector(`[data-leader-val="${i}"][data-leader-type="lN"]`)
    ) {
      if (
        document.querySelector(
          `[data-leader-val="${i}"][data-leader-type="lN"]`
        ).value.length == 0
      ) {
        alert("Не все заполнены поля");
        return;
      }
      if (
        document.querySelector(
          `[data-leader-val="${i}"][data-leader-type="fN"]`
        ).value.length == 0
      ) {
        alert("Не все заполнены поля");
        return;
      }
      if (
        document.querySelector(
          `[data-leader-val="${i}"][data-leader-type="mN"]`
        ).value.length == 0
      ) {
        alert("Не все заполнены поля");
        return;
      }
      members.push({
        lN: document.querySelector(
          `[data-leader-val="${i}"][data-leader-type="lN"]`
        ).value,
        fN: document.querySelector(
          `[data-leader-val="${i}"][data-leader-type="fN"]`
        ).value,
        mN: document.querySelector(
          `[data-leader-val="${i}"][data-leader-type="mN"]`
        ).value,
        pos: document.querySelector(
          `[data-leader-val="${i}"][data-leader-type="pos"]`
        ).value
      });
    }
  }
  let sendingData = new FormData();
  sendingData.append("name_project", name_project);
  sendingData.append("members", JSON.stringify(members));
  sendingData.append("leaders", JSON.stringify(leaders));
  sendingData.append("idsec", idsec);

  getJSON("/api/requests/sendRequest", sendingData, data => {
    if (data.answer == 0) {
      alert(
        "Заявка успешно отправлена, модератор мероприятия скоро её промодерирует!"
      );
      $("#openSend").modal("hide");
    }
    if (data.answer == 1) {
      alert(
        "Заявка не отправлена. Участника нет в системе lk.chuvsu.ru по указанным данным: (фамилия, №зачетки)!"
      );
      $("#openSend").modal("hide");
    }
  });
}

function addMember() {
  return cDiv(
    [{ class: `form-group row member_block${memberID}` }],
    [
      cDiv(
        [{ class: "col-md-6" }],
        cDiv({ class: "form-group" }, [
          cEl(
            "select",
            [
              { class: "form-control" },
              { id: "" },
              { onchange: `update_inst(${memberID}, this)` },
              { "data-mem-val": memberID },
              { "data-mem-type": "inst" }
            ],
            [new Option("ЧувГУ", "0")].concat(
              instTypes.map(f => {
                return new Option(f.type, f.ID);
              })
            )
          )
        ])
      ),
      cDiv(
        [{ class: "col-md-6" }],
        cDiv({ class: "form-group" }, [
          cEl("input", [
            { class: "form-control boxed" },
            { type: "text" },
            { placeholder: "Фамилия" },
            { "data-mem-val": memberID },
            { "data-mem-type": "lN" }
          ])
        ])
      ),
      cDiv(
        [{ class: "col-md-6" }],
        cDiv({ class: "form-group" }, [
          cEl("input", [
            { class: "form-control boxed" },
            { type: "text" },
            { placeholder: "№ студбилета" },
            { "data-mem-val": memberID },
            { "data-mem-type": "num" }
          ])
        ])
      ),
      cDiv(
        [{ class: "col-md-4" }],
        [
          cDiv({ class: "custom-control custom-radio" }, [
            cEl("input", [
              { class: "custom-control-input" },
              { type: "radio" },
              { name: `budjet_info_${memberID}` },
              { id: `budjet_info_${memberID}1` },
              { "data-mem-val": memberID },
              { "data-mem-type": "b" },
              { value: "1" },
              { checked: "checked" }
            ]),
            cEl(
              "label",
              [
                { for: `budjet_info_${memberID}1` },
                { class: "custom-control-label" }
              ],
              " Бюджет "
            )
          ]),
          cDiv({ class: "custom-control custom-radio" }, [
            cEl("input", [
              { class: "custom-control-input" },
              { type: "radio" },
              { name: `budjet_info_${memberID}` },
              { id: `budjet_info_${memberID}2` },
              { "data-mem-val": memberID },
              { "data-mem-type": "b" },
              { value: "2" }
            ]),
            cEl(
              "label",
              [
                { for: `budjet_info_${memberID}2` },
                { class: "custom-control-label" }
              ],
              " Контракт "
            )
          ])
        ]
      ),
      cDiv(
        [{ class: "col-md-6" }, { style: `display:none` }],
        cDiv({ class: "form-group" }, [
          cEl("input", [
            { class: "form-control boxed" },
            { type: "text" },
            { placeholder: "Имя" },
            { "data-mem-val": memberID },
            { "data-mem-type": "fN" }
          ])
        ])
      ),
      cDiv(
        [{ class: "col-md-6" }, { style: `display:none` }],
        cDiv({ class: "form-group" }, [
          cEl("input", [
            { class: "form-control boxed" },
            { type: "text" },
            { placeholder: "Отчество" },
            { "data-mem-val": memberID },
            { "data-mem-type": "mN" }
          ])
        ])
      ),
      cDiv(
        [{ class: "col-md-6" }, { style: `display:none` }],
        cDiv({ class: "form-group" }, [
          cEl("input", [
            { class: "form-control boxed" },
            { type: "text" },
            { placeholder: "Город учреждения" },
            { "data-mem-val": memberID },
            { "data-mem-type": "city" }
          ])
        ])
      ),
      cDiv(
        [{ class: "col-md-6" }, { style: `display:none;` }],
        cDiv({ class: "form-group" }, [
          cEl("input", [
            { class: "form-control boxed" },
            { type: "text" },
            { placeholder: "Название учреждения" },
            { "data-mem-val": memberID },
            { "data-mem-type": "n_o" }
          ])
        ])
      ),
      cDiv(
        [{ class: "col-md-10" }, { style: `display:none;` }],
        cDiv({ class: "form-group" }, [
          cEl("input", [
            { class: "form-control boxed" },
            { type: "text" },
            { placeholder: "Телефон" },
            { "data-mem-val": memberID },
            { "data-mem-type": "phone" }
          ])
        ])
      ),
      cDiv(
        { class: "col-md-2" },
        cDiv(
          { class: "btn-group btn-group-sm" },
          cEl(
            "a",
            [
              { class: "btn btn-danger" },
              {
                onclick: `document.querySelector('.member_block${memberID++}').remove();`
              }
            ],
            cEl("i", { class: "fa fa-times" })
          )
        )
      )
    ]
  );
}
