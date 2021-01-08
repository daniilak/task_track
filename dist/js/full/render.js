function getMenu() {
  getJSON("/api/menu/get", null, menu => {
    localStorage.setItem("version", 20);
    localStorage.setItem("menu", JSON.stringify(menu));
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
  let a = document.getElementById("navbarsExample03");
  a.appendChild(
    cEl(
      "ul",
      { class: "nav navbar-nav navbar-right" },
      cEl(
        "li",
        { class: `nav-item` },
        cEl("a", [{ class: "nav-link" }, { href: "/?logout" }], "Выйти")
      )
    )
  );
}
function renderNews() {
  getJSON("/api/news/getAll", null, data => {
    remove(".render-loader");
    i = 0;
    data.forEach(dataElem => {
      containerFluid.appendChild(
        cDiv(
          { class: "callout" },
          cEl("p", { class: "callout-" + i }, dataElem.text)
        )
      );
      document.querySelector(".callout-" + i).innerHTML = dataElem.text;
      i++;
    });
  });
}
function getEvents() {
  remove(".row.events-list");
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
  getJSON("/api/events/getAll", sendingData, data => {
    remove(".render-loader");
    containerFluid.appendChild(cDiv({ class: "row events-list" }));
    let container = document.querySelector(".events-list");
    if (data.length != 0) {
      data.forEach(dataElem => {
        container.appendChild(renderBlockEvent(dataElem));
      });
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
}
let userListForManual = [];
function getManual() {
  remove(".row.manual-list");
  getJSON("/api/manual/getUsersList", null, data => {
    remove(".render-loader");
    containerFluid.appendChild(
      cDiv({ class: "form-group row" }, [
        cDiv(
          { class: "col-md-3 radio" },
          cEl("label", null, [
            cEl("input", [
              { type: "radio" },
              { name: "showUsers" },
              { id: "showUsers" },
              { value: "0" },
              { checked: "" },
              { onchange: "requestAction('showUsers',0, this);" }
            ]),
            "Показать всех"
          ])
        ),
        cDiv(
          { class: "col-md-3 radio" },
          cEl("label", null, [
            cEl("input", [
              { type: "radio" },
              { name: "showUsers" },
              { id: "showUsers" },
              { value: "1" },
              { onchange: "requestAction('showUsers',0, this);" }
            ]),
            "Показать модераторов системы"
          ])
        ),
        role == 2
          ? cDiv()
          : cDiv(
              { class: "col-md-3 radio" },
              cEl("label", null, [
                cEl("input", [
                  { type: "radio" },
                  { name: "showUsers" },
                  { id: "showUsers" },
                  { value: "2" },
                  { onchange: "requestAction('showUsers',0, this);" }
                ]),
                "Показать администраторов системы"
              ])
            )
      ])
    );
    containerFluid.appendChild(
      cDiv({ class: "form-group row" }, [
        cEl("input", [
          { type: "text" },
          { oninput: "requestAction('search',0, this);" },
          { class: "form-control boxed searching" },
          { placeholder: "Искать пользователей в системе..." }
        ])
      ])
    );
    containerFluid.appendChild(cDiv({ class: "row manual-list" }));
    userRoles = data;
    searchUserManual("", 0);
  });
}
function searchUserManual(str, checked) {
  let container = document.querySelector(".manual-list");
  container.innerHTML = "";
  if (userRoles.length != 0) {
    userRoles.forEach(dataElem => {
      container.appendChild(renderBlockUser(dataElem, str, checked));
    });
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
}
role = parseInt(document.querySelector("body").getAttribute("data-role"));
let userRolesOpt =
  role == 2
    ? ["Секретарь", "Модератор"]
    : role == 3
    ? ["Секретарь", "Модератор", "Администратор"]
    : ["Секретарь", "Модератор", "Администратор", "СуперАдминистратор"];
function renderBlockUser(data, fName = "", checked = 0) {
  if (fName.length > 0) {
    let first_name = data.first_name.toLowerCase();
    if (first_name.indexOf(fName.toLowerCase()) == -1) {
      return cDiv();
    }
  }
  if (data.id_role != checked) {
    return cDiv();
  }
  return cDiv(
    { class: "col-12 col-sm-6 col-md-3" },
    cDiv({ class: "card bg-light" }, [
      cDiv({ class: "card-body pt-0" }, [
        cEl("img", [
          { class: "img-circle" },
          { src: data.photo },
          { style: "width: 100px;" }
        ]),
        cEl(
          "h2",
          { class: "lead" },
          cEl(
            "a",
            [{ href: "https://vk.com/id" + data.id_vk }, { target: "_blank" }],
            data.first_name
          )
        )
      ]),
      cDiv(
        { class: "card-footer" },
        cEl(
          "select",
          [
            { href: `/event/${data["ID"]}` },
            { onchange: `requestAction("user_role", ${data["ID"]}, this);` },
            { class: "form-control" }
          ],
          userRolesOpt.map((a, b) => {
            return new Option(
              a,
              b,
              data.id_role == a ? !0 : !1,
              data.id_role == b ? !0 : !1
            );
          })
        )
      )
    ])
  );
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
      window.load[4] = !0;
      return;
    }
  }
  httpPost("/api/conf/getActive").then(
    response => {
      conf_id = Number(JSON.parse(response).ID);
      localStorage.setItem("conf_id", conf_id);
      conf_name = JSON.parse(response).name_event;
      localStorage.setItem("conf_name", conf_name);
      window.load[4] = !0;
    },
    error => alert(`Rejected: ${error}`)
  );
}
function renderPasswordBlock() {
  containerFluid.appendChild(
    cDiv({ class: "input-group input-group-sm" }, [
      cEl("input", [
        { type: "text" },
        { class: "form-control" },
        { id: "sendPassEvent" },
        { placeholder: "Введите пароль от секции...." }
      ]),
      cSpan(
        { class: "input-group-btn" },
        cEl(
          "button",
          [
            { type: "button" },
            { class: "btn btn-success btn-flat" },
            { onclick: "sendPassEvent()" }
          ],
          "Получить доступ"
        )
      )
    ])
  );
}
function sendPassEvent() {
  let val = document.querySelector("#sendPassEvent").value;
  if (val.length == 0) return;
  let sendingData = new FormData();
  sendingData.append("pass", val);
  sendingData.append("id_event", window.location.pathname.split("/")[2]);
  getJSON("/api/events/pass", sendingData, data => {
    if (data.done == 2) {
      alert("Пароль неверный");
      return;
    } else {
      document.location.reload(!0);
    }
  });
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
          cookieFac == f.ID ? !0 : !1,
          cookieFac == f.ID ? !0 : !1
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
        cookieType == f.ID ? !0 : !1,
        cookieType == f.ID ? !0 : !1
      )
    );
    optionsTypesForAdd.add(new Option(f.type, f.ID));
  });
  document
    .querySelector('[name="add-event-conf-id"]')
    .add(new Option(conf_name, conf_id));
  containerFluid.appendChild(
    cDiv({ class: "row mb-3" }, [
      cDiv(
        { class: "col-md-3 form-group" },
        cEl(
          "select",
          [
            { onchange: "onchangeFilterFac()" },
            { class: "form-control boxed filter_fac" }
          ],
          optionsFacs
        )
      ),
      cDiv(
        { class: "col-md-3 form-group" },
        cEl(
          "select",
          [
            { onchange: "onchangeFilterType()" },
            { class: "form-control boxed filter_type" }
          ],
          optionsTypes
        )
      ),
      cDiv(
        { class: "col-md-3 form-group" },
        cEl("input", [
          { oninput: "onchangeFilterSearch()" },
          { class: "form-control boxed filter_search" },
          { placeholder: "Начните вводить..." }
        ])
      ),
      cDiv(
        [
          { class: "col-md-3 form-group" },
          { style: `display:${role == 0 ? "none" : ""};` }
        ],
        cEl(
          "button",
          [
            { type: "button" },
            { class: "btn btn-block bg-success" },
            { "data-toggle": "modal" },
            { "data-target": "#appendEvent" }
          ],
          "Добавить мероприятие"
        )
      )
    ])
  );
}
function renderBlockEvent(data) {
  let t = data.datetime.split(/[- :]/);
  return cDiv(
    { class: "col-12 col-sm-6 col-md-4" },
    cDiv({ class: "card bg-light" }, [
      cDiv({ class: "card-header row text-muted" }, [
        cEl(
          "div",
          { class: "col-md-6" },
          eventTypes[Number(data.id_type_section) - 1].type_n +
            " " +
            data.location
        ),
        cEl(
          "div",
          { class: "col-md-6 text-right" },
          `${t[2]}.${t[1]}.${t[0]} ${t[3]}:${t[4]}`
        )
      ]),
      cDiv({ class: "card-body pt-0" }, [
        cEl("h2", { class: "lead" }, cEl("b", null, data.name)),
        cEl(
          "b",
          { class: "text-muted text-sm" },
          facs[Number(data.id_fac - 1)].full_name
        ),
        cEl("p", { class: "text-muted text-sm" }, [
          cEl("b", null, "Автор:"),
          cEl(
            "a",
            [{ href: "https://vk.com/id" + data.vk_id }, { target: "_blank" }],
            !data.fName ? " - " : data.fName
          )
        ]),
        cEl("ul", { class: "nav flex-column" }, [
          cEl(
            "li",
            { class: "nav-item" },
            cEl("a", { class: "nav-link" }, [
              "Работ",
              cEl("span", { class: "float-right badge bg-success" }, data.c1)
            ])
          ),
          cEl(
            "li",
            { class: "nav-item" },
            cEl("a", { class: "nav-link" }, [
              "Руководителей",
              cEl("span", { class: "float-right badge bg-success" }, data.c2)
            ])
          ),
          cEl(
            "li",
            { class: "nav-item" },
            cEl("a", { class: "nav-link" }, [
              "Заявок",
              cEl(
                "span",
                {
                  class: `float-right badge bg-${
                    data["c3"] > 0 ? "danger" : "success"
                  }`
                },
                data.c3
              )
            ])
          )
        ])
      ]),
      cDiv(
        { class: "card-footer" },
        cDiv(
          { class: "text-right" },
          cEl(
            "a",
            [
              { href: `/event/${data["ID"]}` },
              { class: "btn btn-sm btn-success" }
            ],
            " Редактировать"
          )
        )
      )
    ])
  );
}
function getRecs() {
  let sendingData = new FormData();
  sendingData.append("id_event", window.location.pathname.split("/")[2]);
  getJSON("/api/recs/get", sendingData, data => {
    recsListChecked = data.checked;
    for (i = 0; i < data.list.length; i++) {
      recsList.push(data.list[i].ID);
      document
        .querySelector(".recs-block")
        .appendChild(
          cDiv({ class: "form-group row" }, [
            cEl("label", null, data.list[i].recommendation + ":"),
            cEl("select", [
              { style: "width: 100%;" },
              { multiple: "multiple" },
              { "data-typeselect": "recommendation" },
              { class: "form-control recommendation-" + data.list[i].ID },
              { "data-recommendation": data.list[i].ID },
              { "data-id": data.list[i].ID }
            ])
          ])
        );
      renderSelect2Re({
        class: ".recommendation-" + data.list[i].ID,
        r:
          data.checked.length == 0 || !data.checked[data.list[i].ID]
            ? "[]"
            : "[" + data.checked[data.list[i].ID] + "]"
      });
    }
    window.loader.recs = !0;
  });
}
function renderEditorWin() {
  return cDiv(null, [
    eventData.id_type_section == 1
      ? cDiv({ class: "form-group row custom-control custom-checkbox" }, [
          cEl("input", [
            { type: "checkbox" },
            { id: "disabled_place" },
            eventData.id_disabled_place == 1
              ? { checked: !0 }
              : { "data-kek": "" },
            { onclick: `requestAction('disabled_place', ${id_event}, this)` },
            { class: "custom-control-input" }
          ]),
          cEl(
            "label",
            [{ for: "disabled_place" }, { class: "custom-control-label" }],
            "В данном мероприятии участвуют гости, снять ограничения на призовые места"
          )
        ])
      : cDiv(),
    cDiv({ class: "form-group row" }, [
      cEl("label", null, "1 место:"),
      cEl("select", [
        { style: "width: 100%;" },
        { multiple: "multiple" },
        { "data-typeselect": "place" },
        { class: "form-control place-1" },
        { "data-place": 1 }
      ])
    ]),
    cDiv({ class: "form-group row" }, [
      cEl("label", null, "2 место:"),
      cEl("select", [
        { style: "width: 100%;" },
        { multiple: "multiple" },
        { "data-typeselect": "place" },
        { class: "form-control place-2" },
        { "data-place": 2 }
      ])
    ]),
    cDiv({ class: "form-group row" }, [
      cEl("label", null, "3 место:"),
      cEl("select", [
        { style: "width: 100%;" },
        { multiple: "multiple" },
        { "data-typeselect": "place" },
        { class: "form-control place-3" },
        { "data-place": 3 }
      ])
    ]),
    cDiv({ class: "form-group row" }, cEl("h4", null, "Рекомендации:")),
    cDiv({ class: "recs-block" })
  ]);
}
function renderEditorEvent() {
  containerFluid.appendChild(
    cDiv({ class: "row" }, [
      cDiv(
        { class: "col-md-9" },
        cDiv({ class: "card card-olive card-outline" }, [
          cDiv(
            { class: "card-header p-2" },
            cEl("ul", { class: "nav nav-pills" }, [
              cEl(
                "li",
                { class: "nav-item" },
                cEl(
                  "a",
                  [
                    { class: "nav-link" },
                    { href: "#settings" },
                    { "data-toggle": "tab" }
                  ],
                  "Настройки"
                )
              ),
              cEl(
                "li",
                { class: "nav-item" },
                cEl(
                  "a",
                  [
                    { class: "nav-link active" },
                    { href: "#requests" },
                    { "data-toggle": "tab" }
                  ],
                  textTpEvent[typeEvent][5]
                )
              ),
              cEl(
                "li",
                { class: "nav-item" },
                cEl(
                  "a",
                  [
                    { class: "nav-link" },
                    { href: "#supervisors" },
                    { "data-toggle": "tab" }
                  ],
                  "Руководители"
                )
              ),
              cEl(
                "li",
                { class: "nav-item" },
                cEl(
                  "a",
                  [
                    { class: "nav-link" },
                    { href: "#juri" },
                    { "data-toggle": "tab" }
                  ],
                  "Жюри"
                )
              ),
              cEl(
                "li",
                { class: "nav-item" },
                cEl(
                  "a",
                  [
                    { class: "nav-link" },
                    { href: "#win" },
                    { "data-toggle": "tab" }
                  ],
                  "Места и рекомендации"
                )
              )
            ])
          ),
          cDiv(
            { class: "card-body" },
            cDiv({ class: "tab-content" }, [
              cDiv([{ class: "tab-pane" }, { id: "settings" }], EditorSettings),
              cDiv(
                [{ class: "tab-pane active" }, { id: "requests" }],
                [
                  cDiv(null, EditorRequests),
                  cEl("hr"),
                  cEl(
                    "a",
                    [
                      { role: "button" },
                      { onclick: "requestAction('append_r')" },
                      { class: "btn bg-olive pull-right" }
                    ],
                    [
                      cEl("i", { class: "fas fa-plus" }),
                      " " + textTpEvent[typeEvent][3]
                    ]
                  )
                ]
              ),
              cDiv(
                [{ class: "tab-pane" }, { id: "supervisors" }],
                [
                  cDiv(null, EditorSupervisors),
                  cEl("hr"),
                  cEl(
                    "a",
                    [
                      { role: "button" },
                      { onclick: "requestAction('append_sup')" },
                      { class: "btn bg-olive pull-right" }
                    ],
                    [
                      cEl("i", { class: "fas fa-plus" }),
                      " Научного руководителя"
                    ]
                  )
                ]
              ),
              cDiv(
                [{ class: "tab-pane" }, { id: "juri" }],
                [
                  cDiv(null, EditorJuri),
                  cEl("hr"),
                  cEl(
                    "a",
                    [
                      { role: "button" },
                      { onclick: "requestAction('append_juri')" },
                      { class: "btn bg-olive pull-right" }
                    ],
                    [cEl("i", { class: "fas fa-plus" }), " жюри"]
                  )
                ]
              ),
              cDiv(
                [{ class: "tab-pane" }, { id: "win" }],
                cDiv(null, EditorWin)
              )
            ])
          )
        ])
      ),
      cDiv({ class: "col-md-3" }, [printAdvice(), renderDescEvent()])
    ])
  );
}
function renderEditorSettings() {
  let optionsFacs = [];
  let optionsFacsForReplace = document.querySelector(
    '[name="replace-event-fac"]'
  );
  facs.forEach(f => {
    if (f.ID != 1) {
      optionsFacs.push(
        new Option(
          f.full_name,
          f.ID,
          eventData.id_fac == f.ID ? !0 : !1,
          eventData.id_fac == f.ID ? !0 : !1
        )
      );
      optionsFacsForReplace.add(new Option(f.full_name, f.ID));
    }
  });
  document.querySelector(
    '[name="replace-event-fac"]'
  ).options = optionsFacsForReplace;
  let optionsTypes = [];
  eventTypes.forEach(f => {
    optionsTypes.push(
      new Option(
        f.type,
        f.ID,
        eventData.id_type_section == f.ID ? !0 : !1,
        eventData.id_type_section == f.ID ? !0 : !1
      )
    );
  });
  let t = eventData.datetime.split(/[- :]/);
  return cDiv({ class: "" }, [
    cDiv({ class: "form-group" }, [
      cEl("label", { class: "control-label" }, "Название секции:"),
      cEl("input", [
        { type: "text" },
        { class: "form-control boxed" },
        { onchange: "updateEventSettings('name', this)" },
        { value: eventData.name }
      ])
    ]),
    cDiv({ class: "form-group" }, [
      cEl("label", { class: "control-label" }, "Тип секции:"),
      cEl(
        "select",
        [
          { type: "text" },
          { class: "form-control boxed" },
          { onchange: "updateEventSettings('id_type_section', this)" }
        ],
        optionsTypes
      )
    ]),
    cDiv({ class: "form-group" }, [
      cEl("label", { class: "control-label" }, "Факультет секции:"),
      cEl(
        "select",
        [
          { type: "text" },
          { class: "form-control boxed" },
          { onchange: "updateEventSettings('id_fac', this)" }
        ],
        optionsFacs
      )
    ]),
    cDiv({ class: "form-group" }, [
      cEl("label", { class: "control-label" }, "Дата проведения:"),
      cEl("input", [
        { type: "datetime-local" },
        { class: "form-control boxed" },
        { oninput: "updateEventSettings('datetime',this)" },
        { value: `${t[0]}-${t[1]}-${t[2]}T${t[3]}:${t[4]}` }
      ])
    ]),
    cDiv({ class: "form-group" }, [
      cEl("label", { class: "control-label" }, "Кто может принять участие:"),
      cEl("select", [
        { style: "width: 100%;" },
        { multiple: "multiple" },
        { class: "form-control boxed who" }
      ])
    ]),
    cDiv({ class: "form-group" }, [
      cEl("label", { class: "control-label" }, "Номер телефона или почта:"),
      cEl("input", [
        { type: "text" },
        { class: "form-control boxed" },
        { oninput: "updateEventSettings('phone', this)" },
        { value: eventData.phone }
      ]),
      cEl(
        "p",
        { class: "help-block" },
        "Рекомендуется поставить для связи с ответственным"
      )
    ]),
    cDiv({ class: "form-group" }, [
      cEl("label", { class: "control-label" }, "Место проведения:"),
      cEl("input", [
        { type: "text" },
        { class: "form-control boxed" },
        { onchange: "updateEventSettings('location', this)" },
        { value: eventData.location }
      ]),
      cEl(
        "p",
        { class: "help-block" },
        "Буква корпуса, дефис, кабинет. Например, Г-316"
      )
    ]),
    cDiv(
      [
        { class: "form-group" },
        { style: `display:${eventData.pass ? eventData.pass : "none"};` }
      ],
      [
        cEl("label", { class: "control-label" }, "Пароль секции:"),
        cEl("input", [
          { type: "text" },
          { class: "form-control boxed" },
          { onchange: "updateEventSettings('pass', this)" },
          { value: eventData.pass }
        ])
      ]
    ),
    role > 1
      ? cEl(
          "a",
          [
            { class: "btn bg-danger" },
            { onclick: `requestAction('remove_event', ${id_event})` }
          ],
          "Удалить мероприятие"
        )
      : cDiv()
  ]);
}
let requestsList = [];
function renderEditorRequests() {
  let sendingData = new FormData();
  sendingData.append("event_id", window.location.pathname.split("/")[2]);
  let div = [];
  getJSON("/api/requests/getAll", sendingData, requests => {
    if (requests.length > 0)
      requests.forEach(d => div.push(renderRequestBlock(d)));
    window.loader.request = !0;
  });
  return div;
}
function renderRequestBlock(d) {
  requestsList.push({
    id: d.ID,
    text: d.name_project + " (ID " + d.ID + ")",
    place: d.place
  });
  countPlaces = Math.round(requestsList.length * 0.3);
  return cDiv(
    [
      {
        class: `card card-${
          d.is_moderator == 0 ? "primary" : "danger"
        } card-outline`
      },
      { "data-r-block": d.ID }
    ],
    [
      cDiv({ class: "card-header" }, [
        cDiv(
          { class: "card-title col-md-10" },
          cEl("input", [
            { class: "form-control" },
            { type: "text" },
            { placeholder: "Название" },
            { value: d.name_project },
            { onchange: `requestAction('r_name',${d.ID}, this)` }
          ])
        ),
        cDiv({ class: "card-tools" }, [
          cEl(
            "button",
            [
              { type: "button" },
              { class: "btn btn-tool" },
              { "data-card-widget": "collapse" }
            ],
            `ID${d.ID}`
          ),
          cDiv({ class: "btn-group" }, [
            cEl(
              "button",
              [
                { type: "button" },
                { class: "btn btn-tool dropdown-toggle" },
                { "data-toggle": "dropdown" },
                { "aria-expanded": "false" }
              ],
              cEl("i", { class: "fas fa-wrench" })
            ),
            cDiv(
              [
                { class: "dropdown-menu dropdown-menu-right" },
                { role: "menu" },
                { "x-placement": "bottom-end" },
                {
                  style:
                    "position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(46px, 19px, 0px);"
                }
              ],
              [
                cEl(
                  "a",
                  [
                    { role: "button" },
                    { class: "dropdown-item" },
                    { "data-type": "" },
                    { onclick: `requestAction("remove_request",${d.ID})` }
                  ],
                  "Удалить работу"
                ),
                d.is_moderator == 1
                  ? cEl(
                      "a",
                      [
                        { role: "button" },
                        { class: "dropdown-item" },
                        { onclick: `requestAction("moderator",${d.ID}, this)` }
                      ],
                      "Допустить работу"
                    )
                  : cDiv(null),
                cEl(
                  "a",
                  [
                    { role: "button" },
                    { class: "dropdown-item" },
                    { "data-toggle": "modal" },
                    { "data-target": "#replaceEvent" },
                    { onclick: `replaceEventID = ${d.ID};` }
                  ],
                  "Переместить работу"
                ),
                cEl(
                  "a",
                  [
                    { role: "button" },
                    { class: "dropdown-item" },
                    { "data-type": d.ID },
                    { onclick: `requestAction("append",${d.ID}, this)` }
                  ],
                  "Добавить участника"
                )
              ]
            )
          ])
        ])
      ]),
      renderMembersBlock(d.ID, d.members)
    ]
  );
}
function renderMembersBlock(id, data) {
  let a = [];
  if (!data) return;
  data.forEach(u => {
    a.push(
      cDiv(
        [{ class: "card-header" }, { "data-member-desc": u.ID }],
        [
          cEl(
            "h3",
            { class: "card-title" },
            cEl("dl", null, [
              cEl(
                "dt",
                null,
                `${u.last_name} ${u.first_name} ${u.middle_name}`
              ),
              cEl(
                "dd",
                null,
                `${
                  u.is_chuvsu == 1
                    ? "№" +
                      u.num_student +
                      (u.stip == 1 ? " Бюджет " : " Контракт ") +
                      " гр. " +
                      u.groupname
                    : u.name_organization == "ФГБОУ ВО «ЧГУ им. И.Н. Ульянова»"
                    ? "Нет в базе lk.chuvsu.ru или неверные данные"
                    : u.name_organization + " " + u.city
                } `
              )
            ])
          ),
          cDiv(
            { class: "btn-group btn-group-sm float-right" },
            cDiv({ class: "btn-group" }, [
              cEl(
                "button",
                [
                  { class: "btn bg-warning" },
                  { type: "button" },
                  { onclick: `hideOpenEditorMember(${u.ID}, this)` }
                ],
                [cEl("i", { class: "fas fa-cog" }), " Изменить"]
              ),
              cEl(
                "button",
                [
                  { class: "btn bg-maroon" },
                  { type: "button" },
                  { onclick: `requestAction('remove_u',${u.ID}, this)` }
                ],
                [cEl("i", { class: "fas fa-trash" }), " Удалить"]
              )
            ])
          )
        ]
      ),
      cDiv(
        [
          { class: "card-body row" },
          { "data-member-block": u.ID },
          { style: "display:none;" }
        ],
        [
          cDiv(
            [{ class: "col-md-3" }],
            cDiv({ class: "form-group" }, [
              cEl(
                "select",
                [
                  { class: "form-control" },
                  { id: "" },
                  { onchange: `requestAction('update_inst',${u.ID}, this)` }
                ],
                [
                  new Option(
                    "ЧувГУ",
                    "0",
                    u.is_chuvsu == 1 ? !0 : !1,
                    u.is_chuvsu == 1 ? !0 : !1
                  )
                ].concat(
                  instTypes.map(f => {
                    return new Option(
                      f.type,
                      f.ID,
                      u.is_chuvsu != 1 && u.id_type_inst == f.ID ? !0 : !1,
                      u.is_chuvsu != 1 && u.id_type_inst == f.ID ? !0 : !1
                    );
                  })
                )
              )
            ])
          ),
          cDiv(
            [{ class: "col-md-3" }],
            cDiv({ class: "form-group" }, [
              cEl("input", [
                { class: "form-control boxed" },
                { type: "text" },
                { value: u.last_name },
                { placeholder: "Фамилия" }
              ])
            ])
          ),
          cDiv(
            [
              { class: "col-md-3" },
              { style: `display:${u.is_chuvsu == 1 ? "" : "none"}` }
            ],
            cDiv({ class: "form-group" }, [
              cEl("input", [
                { class: "form-control boxed" },
                { type: "text" },
                { value: u.num_student },
                { placeholder: "№ студбилета" }
              ])
            ])
          ),
          cDiv(
            [
              { class: "col-md-3" },
              { style: `display:${u.is_chuvsu == 1 ? "" : "none"}` }
            ],
            [
              cDiv({ class: "custom-control custom-radio" }, [
                cEl("input", [
                  { class: "custom-control-input" },
                  { type: "radio" },
                  { name: `budjet_info_${u.ID}` },
                  { id: `budjet_info_${u.ID}1` },
                  { value: "1" },
                  u.stip == 1 ? { checked: "checked" } : { data: "" }
                ]),
                cEl(
                  "label",
                  [
                    { for: `budjet_info_${u.ID}1` },
                    { class: "custom-control-label" }
                  ],
                  " Бюджет "
                )
              ]),
              cDiv({ class: "custom-control custom-radio" }, [
                cEl("input", [
                  { class: "custom-control-input" },
                  { type: "radio" },
                  { name: `budjet_info_${u.ID}` },
                  { id: `budjet_info_${u.ID}2` },
                  { value: "2" },
                  u.stip == 0 || u.stip == 2
                    ? { checked: "checked" }
                    : { data: "" }
                ]),
                cEl(
                  "label",
                  [
                    { for: `budjet_info_${u.ID}2` },
                    { class: "custom-control-label" }
                  ],
                  " Контракт "
                )
              ])
            ]
          ),
          cDiv(
            [
              { class: "col-md-3" },
              { style: `display:${u.is_chuvsu == 1 ? "none" : ""}` }
            ],
            cDiv({ class: "form-group" }, [
              cEl("input", [
                { class: "form-control boxed" },
                { type: "text" },
                { value: u.first_name },
                { placeholder: "Имя" }
              ])
            ])
          ),
          cDiv(
            [
              { class: "col-md-3" },
              { style: `display:${u.is_chuvsu == 1 ? "none" : ""}` }
            ],
            cDiv({ class: "form-group" }, [
              cEl("input", [
                { class: "form-control boxed" },
                { type: "text" },
                { value: u.middle_name },
                { placeholder: "Отчество" }
              ])
            ])
          ),
          cDiv(
            [
              { class: "col-md-4" },
              { style: `display:${u.is_chuvsu == 1 ? "none" : ""}` }
            ],
            cDiv({ class: "form-group" }, [
              cEl("input", [
                { class: "form-control boxed" },
                { type: "text" },
                { value: u.city },
                { placeholder: "Город учреждения" }
              ])
            ])
          ),
          cDiv(
            [
              { class: "col-md-4" },
              { style: `display:${u.is_chuvsu == 1 ? "none" : ""}` }
            ],
            cDiv({ class: "form-group" }, [
              cEl("input", [
                { class: "form-control boxed" },
                { type: "text" },
                { value: u.name_organization },
                { placeholder: "Название учреждения" }
              ])
            ])
          ),
          cDiv(
            [
              { class: "col-md-4" },
              { style: `display:${u.is_chuvsu == 1 ? "none" : ""}` }
            ],
            cDiv({ class: "form-group" }, [
              cEl("input", [
                { class: "form-control boxed" },
                { type: "text" },
                { value: u.phone },
                { placeholder: "Телефон" }
              ])
            ])
          )
        ]
      )
    );
  });
  return cDiv({ "data-request-member": id }, a);
}
let supervisorsMulti = [];
function renderEditorSupervisors() {
  let sendingData = new FormData();
  sendingData.append("event_id", window.location.pathname.split("/")[2]);
  let div = [];
  getJSON("/api/supervisors/getAll", sendingData, supervisors => {
    if (supervisors.length > 0)
      supervisors.forEach(d => div.push(renderEditorSupervisorsBlock(d)));
    window.loader.supervisors = !0;
  });
  return div;
}
function renderEditorSupervisorsBlock(data) {
  supervisorsMulti.push({
    class: ".supervisors-kur" + data.ID,
    ID: data.ID,
    r: data.id_request
  });
  renderSelect2({
    class: ".supervisors-kur" + data.ID,
    ID: data.ID,
    r: data.id_request
  });
  return cDiv({ "data-supervisorsblock": data.ID }, [
    cDiv({ class: "form-group row" }, [
      cDiv(
        { class: "col-md-3" },
        cEl("input", [
          { type: "text" },
          { class: "form-control" },
          { oninput: `editEventSuperVisors(${data.ID}, 'last_name', this)` },
          { value: data.last_name },
          { placeholder: "Фамилия" }
        ])
      ),
      cDiv(
        { class: "col-md-3" },
        cEl("input", [
          { type: "text" },
          { class: "form-control" },
          { oninput: `editEventSuperVisors(${data.ID}, 'first_name', this)` },
          { value: data.first_name },
          { placeholder: "Имя" }
        ])
      ),
      cDiv(
        { class: "col-md-3" },
        cEl("input", [
          { type: "text" },
          { class: "form-control" },
          { oninput: `editEventSuperVisors(${data.ID}, 'middle_name', this)` },
          { value: data.middle_name },
          { placeholder: "Отчество" }
        ])
      ),
      cDiv(
        [{ class: "col-md-2" }],
        cDiv({ class: "form-group" }, [
          cEl(
            "select",
            [
              { class: "form-control" },
              { "data-id": data.ID },
              {
                onchange: `editEventSuperVisors(${data.ID}, 'id_position', this)`
              }
            ],
            positions.map(f => {
              return new Option(
                f.name,
                f.ID,
                data.id_position == f.ID ? !0 : !1,
                data.id_position == f.ID ? !0 : !1
              );
            })
          )
        ])
      ),
      cDiv(
        { class: "col-1" },
        cDiv(
          { class: "btn-group btn-group-sm" },
          cEl(
            "a",
            [
              { class: "btn btn-danger" },
              { onclick: `requestAction('remove_sup', ${data.ID})` }
            ],
            cEl("i", { class: "fa fa-times" })
          )
        )
      )
    ]),
    cDiv({ class: "form-group row" }, [
      cEl("label", null, `Курирует ${textTpEvent[typeEvent][4]}:`),
      cEl("select", [
        { style: "width: 100%;" },
        { multiple: "multiple" },
        { "data-typeselect": "supervisors" },
        { class: "form-control supervisors-kur" + data.ID },
        { "data-id": data.ID }
      ])
    ]),
    cEl("hr")
  ]);
}
function renderEditorJuri() {
  let sendingData = new FormData();
  sendingData.append("event_id", window.location.pathname.split("/")[2]);
  let div = [];
  getJSON("/api/juri/getAll", sendingData, juri => {
    if (juri.length > 0) juri.forEach(d => div.push(renderJuriBlock(d)));
    window.loader.juri = !0;
  });
  return div;
}
function renderJuriBlock(data) {
  return cDiv({ "data-juriblock": data.ID }, [
    data.type_manager != 3
      ? cEl("h4", null, data.type_manager == 1 ? "Председатель:" : "Секретарь:")
      : cDiv(null, ""),
    cDiv({ class: "form-group row" }, [
      cDiv(
        { class: "col-md-3" },
        cEl("input", [
          { type: "text" },
          { class: "form-control" },
          { oninput: `editEventJuri(${data.ID}, 'last_name', this)` },
          { value: data.last_name },
          { placeholder: "Фамилия" }
        ])
      ),
      cDiv(
        { class: "col-md-3" },
        cEl("input", [
          { type: "text" },
          { class: "form-control" },
          { oninput: `editEventJuri(${data.ID}, 'first_name', this)` },
          { value: data.first_name },
          { placeholder: "Имя" }
        ])
      ),
      cDiv(
        { class: "col-md-3" },
        cEl("input", [
          { type: "text" },
          { class: "form-control" },
          { oninput: `editEventJuri(${data.ID}, 'middle_name', this)` },
          { value: data.middle_name },
          { placeholder: "Отчество" }
        ])
      ),
      cDiv(
        [{ class: "col-md-2" }],
        cDiv({ class: "form-group" }, [
          cEl(
            "select",
            [
              { class: "form-control" },
              { "data-id": data.ID },
              { onchange: `editEventJuri(${data.ID}, 'id_position', this)` }
            ],
            positions.map(f => {
              return new Option(
                f.name,
                f.ID,
                data.id_position == f.ID ? !0 : !1,
                data.id_position == f.ID ? !0 : !1
              );
            })
          )
        ])
      ),
      data.type_manager == 3
        ? cDiv(
            { class: "col-1" },
            cDiv(
              { class: "btn-group btn-group-sm" },
              cEl(
                "a",
                [
                  { class: "btn btn-danger" },
                  { onclick: `requestAction('remove_juri', ${data.ID})` }
                ],
                cEl("i", { class: "fa fa-times" })
              )
            )
          )
        : cDiv(null, "")
    ]),
    cEl("h4", null, data.type_manager == 2 ? "Другие члены жюри:" : "")
  ]);
}
function printAdvice() {
  let items = [
    "Не рекомендуется ставить кавычки в названиях. Они выставляются автоматически",
    "Рекомендуется поставить свои контакты (почта, телефон, соцсети) для связи участников с отвественным за мероприятие",
    "Не забывайте ставить букву корпуса",
    "С сайтом можно работать при помощи смартфона. Он оптимизирован под режим экономии трафика",
    "Все данные автоматически обновляются при изменении",
    "Пароль к мероприятию необходим для предотвращения несанкционированного доступа к мероприятию"
  ];
  return cDiv(
    { class: "col-12" },
    cDiv({ class: "callout callout-info" }, [
      cEl("h5", { class: "text" }, [
        cEl("i", { class: "fa fa-info", "aria-hidden": "true" }, ""),
        " Случайный совет:"
      ]),
      items[Math.floor(Math.random() * items.length)]
    ])
  );
}
function renderDescEvent() {
  let t = eventData.datetime.split(/[- :]/);
  return cDiv(
    { class: "card card-olive card-outline" },
    cDiv({ class: "card-body box-profile text-center" }, [
      cEl(
        "h3",
        [{ class: "profile-username" }, { id: "event-name" }],
        eventData.name
      ),
      cEl(
        "p",
        { id: "event-date" },
        `${eventTypes[Number(eventData.id_type_section) - 1].type_n} / ${
          t[2]
        }.${t[1]}.${t[0]} ${t[3]}:${t[4]}`
      ),
      cEl("p", { id: "event-location" }, eventData.location),
      cEl(
        "a",
        [
          { class: "btn bg-olive btn-block" },
          { href: "/print/" + id_event },
          { target: "_blank" }
        ],
        [cEl("i", [{ class: `fa fa-download` }]), " Протокол"]
      ),
      cEl(
        "a",
        [
          { class: "btn bg-olive btn-block" },
          { href: "/diploma/" + id_event },
          { target: "_blank" }
        ],
        [cEl("i", [{ class: `fa fa-download` }]), " Дипломы"]
      )
    ])
  );
}
