let textTpEvent = [
  ["работа", "работы", "работ", "работу", "работы", "Работы и участники"],
  ["команда", "команды", "команд", "команду", "команды", "Команды и участники"],
  [
    "участник",
    "участника",
    "участников",
    "участника",
    "участников",
    "Участники"
  ]
];
let typeEvent = 0;
let containerFluid = document.querySelector(".container-fluid");
containerFluid.appendChild(
  cDiv(
    { class: "render-loader" },
    cDiv({ class: "col-xs-12 text-center " }, [
      cEl("i", { class: "" }),
      cEl("p", { class: "error-page headline" }, "Загрузка страницы...")
    ])
  )
);
let version = parseInt(
  document.querySelector("body").getAttribute("data-version")
);
let role = parseInt(document.querySelector("body").getAttribute("data-role"));
window.load = [!1, !1, !1, !1];
window.loader = { request: !1, conf: !1, supervisors: !1, juri: !1, recs: !1 };
let facs = [];
let eventTypes = [];
let instTypes = [];
let positions = [];
let conf_id = 0;
let conf_name = "";
function getAndSetLocalStorage(type, id) {
  if (localStorage.getItem(type) && localStorage.getItem("version")) {
    if (Number(localStorage.getItem("version")) == version) {
      if (type == "facs") facs = JSON.parse(localStorage.getItem(type));
      if (type == "eventTypes")
        eventTypes = JSON.parse(localStorage.getItem(type));
      if (type == "instTypes")
        instTypes = JSON.parse(localStorage.getItem(type));
      if (type == "positions")
        positions = JSON.parse(localStorage.getItem(type));
      window.load[id] = !0;
      return;
    }
  }
  localStorage.clear();
  httpPost(`/api/${type}/getAll`).then(
    response => {
      localStorage.setItem(type, response);
      if (type == "facs") facs = JSON.parse(response);
      if (type == "eventTypes") eventTypes = JSON.parse(response);
      if (type == "instTypes") instTypes = JSON.parse(response);
      if (type == "positions") positions = JSON.parse(response);
      window.load[id] = !0;
    },
    error => alert(`Rejected: ${error}`)
  );
}
getMenu();
getActiveConf();
getAndSetLocalStorage("facs", 0);
getAndSetLocalStorage("eventTypes", 1);
getAndSetLocalStorage("instTypes", 2);
getAndSetLocalStorage("positions", 3);
let id_event = 0;
let countPlaces = 0;
let selectedPlaces = [];
let ogr = 1;
let checkedElem = document.querySelector("#disabled_place");
ogr = checkedElem ? (checkedElem.checked ? 0 : 1) : 0;
setTimeout(function tick() {
  if (
    window.load[0] &&
    window.load[1] &&
    window.load[2] &&
    window.load[3] &&
    window.load[4]
  ) {
    if (window.location.pathname.split("/")[1] == "starter") {
      renderNews();
    }
    if (window.location.pathname.split("/")[1] == "events") {
      renderSearchEventBlock();
      getEvents();
    }
    if (window.location.pathname.split("/")[1] == "program") {
      renderSearchEventBlock();
      getEvents();
    }
    if (window.location.pathname.split("/")[1] == "manual") {
      getManual();
    }
    if (window.location.pathname.split("/")[1] == "event") {
      id_event = window.location.pathname.split("/")[2];
      if (id_event.length == 0) {
        window.location.replace("/404");
        return;
      }
      getEventData(id_event);
    }
    return;
  }
  timerId = setTimeout(tick, 100);
}, 100);
let eventData = [];
let who = [
  {
    id: "",
    text: "Бакалавриат/Специалитет",
    children: [
      { id: "b1", text: "1 курс б/с" },
      { id: "b2", text: "2 курс б/с" },
      { id: "b3", text: "3 курс б/с" },
      { id: "b4", text: "4 курс б/с" },
      { id: "b5", text: "5 курс б/с" },
      { id: "b6", text: "6 курс б/с " }
    ]
  },
  {
    id: "",
    text: "Магистратура",
    children: [
      { id: "m1", text: "1 курс маг" },
      { id: "m2", text: "2 курс маг" }
    ]
  },
  {
    id: "",
    text: "Другие",
    children: [{ id: "n0", text: "Сотрудники компаний" }]
  },
  {
    id: "",
    text: "Школьники",
    children: [
      { id: "s1", text: "1 класс" },
      { id: "s2", text: "2 класс" },
      { id: "s3", text: "3 класс" },
      { id: "s4", text: "4 класс" },
      { id: "s5", text: "5 класс" },
      { id: "s6", text: "6 класс" },
      { id: "s7", text: "7 класс" },
      { id: "s8", text: "8 класс" },
      { id: "s9", text: "9 класс" },
      { id: "s10", text: "10 класс" },
      { id: "s11", text: "11 класс" }
    ]
  },
  {
    id: "",
    text: "Аспирантура",
    children: [{ id: "a0", text: "Все курсы аспирантуры" }]
  }
];
let recsList = [];
let recsListChecked = [];
function getEventData(event_id) {
  let sendingData = new FormData();
  sendingData.append("event_id", event_id);
  getJSON("/api/events/getByID", sendingData, data => {
    if (!data) {
      window.location.replace("/events");
    }
    remove(".render-loader");
    if (data.needPass == 0) {
      eventData = data;
      typeEvent =
        eventData.id_type_section == 1 || eventData.id_type_section == 6
          ? 0
          : eventData.id_type_section == 2 ||
            eventData.id_type_section == 3 ||
            eventData.id_type_section == 5 ||
            eventData.id_type_section == 8
          ? 1
          : 2;
      EditorSettings = renderEditorSettings();
      EditorRequests = renderEditorRequests();
      EditorSupervisors = renderEditorSupervisors();
      EditorJuri = renderEditorJuri();
      EditorWin = renderEditorWin();
      document.querySelector(".recs-block");
      setTimeout(function tick() {
        if (
          window.loader.request &&
          window.loader.supervisors &&
          window.loader.juri
        ) {
          renderEditorEvent();
          getRecs();
          supervisorsMulti.forEach(s => renderSelect2(s));
          let checkedElem = document.querySelector("#disabled_place");
          ogr = checkedElem ? (checkedElem.checked ? 0 : 1) : 0;
          let selAndList = placesSelectedAndList();
          let dis = { one: !1, two: !1, thr: !1 };
          console.log(ogr);
          if (ogr == 1) {
            dis = {
              one:
                selAndList[1].sel.length != 0
                  ? !1
                  : countPlaces -
                      selAndList[2].sel.length -
                      selAndList[3].sel.length ==
                    0
                  ? !0
                  : !1,
              two:
                selAndList[2].sel.length != 0
                  ? !1
                  : countPlaces -
                      selAndList[1].sel.length -
                      selAndList[3].sel.length ==
                    0
                  ? !0
                  : !1,
              thr:
                selAndList[3].sel.length != 0
                  ? !1
                  : countPlaces -
                      selAndList[1].sel.length -
                      selAndList[2].sel.length ==
                    0
                  ? !0
                  : !1
            };
          }
          let maxLen = {
            one: ogr == 1 ? 1 : 99999,
            two:
              ogr == 1
                ? countPlaces -
                  selAndList[1].sel.length -
                  selAndList[3].sel.length
                : 99999,
            thr:
              ogr == 1
                ? countPlaces -
                  selAndList[1].sel.length -
                  selAndList[2].sel.length
                : 99999
          };
          renderSelect2Place(".place-1", selAndList[1], dis.one, maxLen.one);
          renderSelect2Place(".place-2", selAndList[2], dis.two, maxLen.two);
          renderSelect2Place(".place-3", selAndList[3], dis.thr, maxLen.thr);
          let $eventSelect = $(".who").select2({
            data: who,
            multiple: !0,
            templateResult: function(item) {
              if (typeof item.children != "undefined") {
                var s =
                  $(item.element).find("option").length -
                  $(item.element).find("option:selected").length;
                var el = $(
                  '<span class="my_select2_optgroup' +
                    (s ? "" : " my_select2_optgroup_selected") +
                    '">' +
                    item.text +
                    "</span>"
                );
                el.click(function() {
                  $(".who")
                    .find('optgroup[label="' + $(this).text() + '"] option')
                    .prop(
                      "selected",
                      $(item.element).find("option").length -
                        $(item.element).find("option:selected").length
                    );
                  $(".who").change();
                  $(".who").select2("close");
                });
                el.mouseover(function() {
                  $("li.select2-results__option--highlighted").removeClass(
                    "select2-results__option--highlighted"
                  );
                });
                el.hover(
                  function() {
                    el.addClass("my_select2_optgroup_hovered");
                  },
                  function() {
                    el.removeClass("my_select2_optgroup_hovered");
                  }
                );
                return el;
              }
              return item.text;
            }
          });
          $(".who")
            .val(JSON.parse(eventData.who))
            .trigger("change");
          $eventSelect.on("change", e => {
            updateEventSettings(
              "who",
              JSON.stringify($eventSelect.select2("val"))
            );
          });
          return;
        }
        timerId = setTimeout(tick, 100);
      }, 100);
    } else {
      containerFluid.appendChild(cEl("p", null, `Мероприятие «${data.name}»`));
      renderPasswordBlock();
    }
  });
}
function placesSelectedAndList() {
  let answer = [];
  for (i = 1; i <= 3; i++) {
    answer[i] = {
      sel: requestsList.filter(r => {
        if (r.place == i) return r;
      }),
      lis: requestsList.filter(r => {
        if (r.place == i || r.place == 4) return r;
      })
    };
  }
  return answer;
}
function renderSelect2Place(className, selList, dis, maxLen) {
  let $eventSelect = $(className).select2({
    data: selList.lis,
    placeholder: "Выберите работы",
    maximumSelectionLength: maxLen
  });
  $eventSelect.prop("disabled", dis);
  console.log(dis);
  $eventSelect
    .val(
      selList.sel.map(s => {
        return s.id;
      })
    )
    .trigger("change");
  $eventSelect.on("select2:select", function(e) {
    if ($($eventSelect[0]).data("typeselect") != "place") {
      return;
    }
    let place = parseInt($($eventSelect[0]).data("place"));
    let elem = e.params.data;
    requestsList.forEach(r => {
      if (r.id == elem.id) r.place = place;
    });
    console.log(requestsList);
    let sendingData = new FormData();
    sendingData.append("id", elem.id);
    sendingData.append("place", place);
    getJSON("/api/requests/setPlace", sendingData, null);
    updateSelect2(place);
  });
  $eventSelect.on("select2:unselect", function(e) {
    if ($($eventSelect[0]).data("typeselect") != "place") {
      return;
    }
    let place = parseInt($($eventSelect[0]).data("place"));
    let elem = e.params.data;
    let sendingData = new FormData();
    sendingData.append("id", elem.id);
    sendingData.append("place", 4);
    getJSON("/api/requests/setPlace", sendingData, null);
    requestsList.forEach(r => {
      if (r.id == elem.id) r.place = 4;
    });
    console.log(requestsList);
    updateSelect2(place);
  });
}
function updateSelect2(place) {
  let selAndList = placesSelectedAndList();
  let dis = { one: !1, two: !1, thr: !1 };
  if (ogr == 1) {
    dis = {
      one:
        selAndList[1].sel.length != 0
          ? !1
          : countPlaces - selAndList[2].sel.length - selAndList[3].sel.length ==
            0
          ? !0
          : !1,
      two:
        selAndList[2].sel.length != 0
          ? !1
          : countPlaces - selAndList[1].sel.length - selAndList[3].sel.length ==
            0
          ? !0
          : !1,
      thr:
        selAndList[3].sel.length != 0
          ? !1
          : countPlaces - selAndList[2].sel.length - selAndList[2].sel.length ==
            0
          ? !0
          : !1
    };
  }
  let maxLen = {
    one: ogr == 1 ? 1 : 99999,
    two:
      ogr == 1
        ? countPlaces - selAndList[1].sel.length - selAndList[3].sel.length
        : 99999,
    thr:
      ogr == 1
        ? countPlaces - selAndList[1].sel.length - selAndList[2].sel.length
        : 99999
  };
  if (place != 1)
    setTimeout(function() {
      $(`.place-1`).prop("disabled", dis.one);
      $(`.place-1`)
        .empty()
        .select2({
          data: selAndList[1].lis.sort((a, b) => a.id.localeCompare(b.id)),
          placeholder: "Выберите работы",
          maximumSelectionLength: maxLen.one
        });
      $(`.place-1`)
        .val(
          selAndList[1].sel.map(s => {
            return s.id;
          })
        )
        .trigger("change");
    });
  if (place != 2)
    setTimeout(function() {
      $(`.place-2`).prop("disabled", dis.two);
      $(`.place-2`)
        .empty()
        .select2({
          data: selAndList[2].lis.sort((a, b) => a.id.localeCompare(b.id)),
          placeholder: "Выберите работы",
          maximumSelectionLength: maxLen.two
        });
      $(`.place-2`)
        .val(
          selAndList[2].sel.map(s => {
            return s.id;
          })
        )
        .trigger("change");
    });
  if (place != 3)
    setTimeout(function() {
      $(`.place-3`).prop("disabled", dis.thr);
      $(`.place-3`)
        .empty()
        .select2({
          data: selAndList[3].lis.sort((a, b) => a.id.localeCompare(b.id)),
          placeholder: "Выберите работы",
          maximumSelectionLength: maxLen.thr
        });
      $(`.place-3`)
        .val(
          selAndList[3].sel.map(s => {
            return s.id;
          })
        )
        .trigger("change");
    });
}
function renderSelect2(s) {
  console.log(s.class);
  $eventSelect = $(s.class).select2({
    data: requestsList,
    placeholder: "Выберите работы",
    maximumSelectionLength: 9999999
  });
  $(s.class)
    .val(JSON.parse(s.r))
    .trigger("change");
  $eventSelect.on("change", function() {
    val = $eventSelect.select2("val");
    console.log($($eventSelect[0]).data("typeselect"));
    if ($($eventSelect[0]).data("typeselect") == "supervisors") {
      let sendingData = new FormData();
      sendingData.append("id", $($eventSelect[0]).data("id"));
      sendingData.append("key", "id_request");
      sendingData.append("value", "[" + val + "]");
      getJSON("/api/supervisors/update", sendingData, data => {});
    }
  });
}
function renderSelect2Re(s) {
  let $eventSelectRe = $(s.class).select2({
    data: requestsList,
    placeholder: "Выберите работы",
    maximumSelectionLength: 9999999
  });
  $(s.class)
    .val(JSON.parse(s.r))
    .trigger("change");
  $eventSelectRe.on("change", function() {
    val = $eventSelectRe.select2("val");
    console.log($($eventSelectRe[0]).data("typeselect"));
    if ($($eventSelectRe[0]).data("typeselect") == "recommendation") {
      let sendingData = new FormData();
      sendingData.append("id", $($eventSelectRe[0]).data("id"));
      sendingData.append("value", "[" + val + "]");
      sendingData.append("id_event", window.location.pathname.split("/")[2]);
      getJSON("/api/recs/update", sendingData, data => {});
    }
  });
}
