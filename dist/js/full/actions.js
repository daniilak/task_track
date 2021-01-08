function replaceEventLoadOption(el) {
  let sendingData = new FormData();
  sendingData.append("id_fac", el.value);
  let eventR = document.querySelector("#replace-event-event");
  eventR.innerHTML = "";
  getJSON("/api/events/getForReplace", sendingData, data => {
    let arr = [];
    data.forEach(f => {
      eventR.add(new Option(f.name, f.ID));
    });
  });
}
function replaceRequest() {
  let sendingData = new FormData();
  sendingData.append(
    "id_event",
    document.querySelector("#replace-event-event").value
  );
  sendingData.append("id_request", replaceEventID);
  sendingData.append("id_old_event", window.location.pathname.split("/")[2]);
  getJSON("/api/requests/replace", sendingData, data => {
    alert("Готово. Работа перенесена");
    let tmp = -1;
    for (i = 0; i < requestsList.length; i++) {
      if (Number(requestsList[i].id) == replaceEventID) tmp = i;
    }
    if (tmp > 0) requestsList.splice(tmp, 1);
    supervisorsMulti.forEach(s =>
      $(`${s.class} option[value="${replaceEventID}"]`).remove()
    );
    countPlaces = ogr == 1 ? Math.round(requestsList.length * 0.3) : 999999;
    document.querySelector(`[data-r-block="${replaceEventID}"]`).remove();
    $("#replaceEvent").modal("hide");
  });
}
function onchangeFilterFac() {
  let a = document.querySelector(".filter_fac");
  document.cookie = "filter_fac=" + a.value + ";expires=15/02/2025 00:00:00";
  getEvents();
}
function onchangeFilterType() {
  let a = document.querySelector(".filter_type");
  document.cookie = "filter_type=" + a.value + ";expires=15/02/2025 00:00:00";
  getEvents();
}
function onchangeFilterFor() {
  let a = document.querySelector(".filter_for");
  document.cookie = "filter_for=" + a.value + ";expires=15/02/2025 00:00:00";
  getEvents();
}
function onchangeFilterSearch() {
  getEvents();
}
function updateEventSettings(type, el) {
  let sendingData = new FormData();
  sendingData.append("event_id", window.location.pathname.split("/")[2]);
  sendingData.append("key", type);
  if (type == "who") {
    sendingData.append("value", el);
  } else if (type == "datetime") {
    let t = el.value.split(/[-T:]/);
    sendingData.append("value", `${t[0]}-${t[1]}-${t[2]} ${t[3]}:${t[4]}:00`);
  } else {
    sendingData.append("value", el.value);
  }
  getJSON("/api/events/update", sendingData, data => {
    if (type == "id_type_section") {
      alert("Страница сейчас перезагрузится");
      location.reload();
    }
  });
}
function editEventJuri(id, type, el) {
  let sendingData = new FormData();
  sendingData.append("id", id);
  sendingData.append("key", type);
  sendingData.append("value", el.value);
  getJSON("/api/juri/update", sendingData, data => {});
}
function editEventSuperVisors(id, type, el) {
  let sendingData = new FormData();
  sendingData.append("id", id);
  sendingData.append("key", type);
  sendingData.append("value", el.value);
  getJSON("/api/supervisors/update", sendingData, data => {});
}
function hideOpenEditorMember(id, el) {
  let a = document.querySelector(`[data-member-block='${id}']`);
  if (a.style.display == "none") {
    el.innerHTML = `<i class="fas fa-check-square"></i> Сохранить`;
    el.className = "btn bg-olive";
    a.style.display = "";
  } else {
    let memberBlock = document.querySelector(`[data-member-block="${id}"]`)
      .children;
    let sendingData = new FormData();
    sendingData.append("id", id);
    sendingData.append(
      "typeInst",
      memberBlock[0].children[0].children[0].value
    );
    sendingData.append("lname", memberBlock[1].children[0].children[0].value);
    sendingData.append(
      "num_stud",
      memberBlock[2].children[0].children[0].value
    );
    sendingData.append(
      "stip",
      document.querySelector(
        `[name="` + memberBlock[3].children[0].children[0].name + `"]:checked`
      ).value
    );
    sendingData.append("fname", memberBlock[4].children[0].children[0].value);
    sendingData.append("mname", memberBlock[5].children[0].children[0].value);
    sendingData.append("city", memberBlock[6].children[0].children[0].value);
    sendingData.append(
      "name_org",
      memberBlock[7].children[0].children[0].value
    );
    sendingData.append("phone", memberBlock[8].children[0].children[0].value);
    getJSON("/api/members/update", sendingData, data => {
      let memberDesc = document.querySelector(`[data-member-desc="${id}"]`)
        .children[0].children[0].children;
      memberDesc[0].innerText = `${data[3]} ${data[4]} ${data[5]}`;
      if (data[0] == 0) {
        memberDesc[0].innerText = `${data[3]} ${data[4]} ${data[5]}`;
        memberDesc[1].innerText = `№${data[6]} ${
          data[7] == 1 ? "Бюджет" : "Контракт"
        } гр. ${data[13]}`;
      }
      if (data[0] == 1) {
        alert("Участника нет в системе lk.chuvsu.ru!");
        memberDesc[1].innerText = `Участника нет в системе lk.chuvsu.ru!`;
      }
      if (data[1] == 2) {
        memberDesc[1].innerText =
          memberBlock[6].children[0].children[0].value +
          " " +
          memberBlock[7].children[0].children[0].value;
      }
      el.className = "btn bg-warning";
      el.innerHTML = `<i class="fas fa-cog"></i> Изменить`;
      a.style.display = "none";
    });
  }
}
function appendEvent() {
  let sendingData = new FormData();
  sendingData.append("name", document.querySelector("#add-event-name").value);
  sendingData.append(
    "conf-id",
    document.querySelector("#add-event-conf-id").value
  );
  sendingData.append("type", document.querySelector("#add-event-type").value);
  sendingData.append("fac", document.querySelector("#add-event-fac").value);
  let t = document.querySelector("#add-event-date").value.split(/[-T:]/);
  sendingData.append("date", `${t[0]}-${t[1]}-${t[2]} ${t[3]}:${t[4]}:00`);
  sendingData.append("pass", document.querySelector("#add-event-pass").value);
  sendingData.append(
    "location",
    document.querySelector("#add-event-location").value
  );
  getJSON("/api/events/append", sendingData, data => {
    alert("Успешно добавлено!");
    $("#appendEvent").modal("hide");
    getEvents();
  });
}
function delRequestPure(id) {
  for (k = 0; k < SelectPureALL.length; k++) {
    if (document.querySelector(`i[data-value="${id}"]`))
      document.querySelector(`i[data-value="${id}"]`).click();
    let tmp = -1;
    SelectPureALL[k]._config.options.forEach((e, m) => {
      if (parseInt(e.value) == id) tmp = m;
    });
    if (tmp > 0) SelectPureALL[k]._config.options.splice(tmp, 1);
    tmp = -1;
    SelectPureALL[k]._config.value.forEach((e, m) => {
      if (parseInt(e) == id) tmp = m;
    });
    if (tmp > 0) SelectPureALL[k]._config.value.splice(tmp, 1);
    SelectPureALL[k]._select._node.children[1].innerHTML = "";
    SelectPureALL[k]._generateOptions();
  }
}
function requestAction(action, id = 0, el = null) {
  if (action == "search") {
    searchUserManual(
      el.value,
      document.querySelector("#showUsers:checked").value
    );
  }
  if (action == "showUsers") {
    searchUserManual(
      document.querySelector(".searching").value,
      document.querySelector("#showUsers:checked").value
    );
  }
  if (action == "append_r") {
    let sendingData = new FormData();
    sendingData.append("id", window.location.pathname.split("/")[2]);
    getJSON("/api/requests/append", sendingData, data => {
      let a = document.querySelector("#requests").children[0];
      a.appendChild(renderRequestBlock(data[0]));
      updateSelect2(0);
      supervisorsMulti.forEach(s => {
        let o = new Option(
          "Безымянный (ID " + data[0].ID + ")",
          data[0].ID,
          !1,
          !1
        );
        $(s.class)
          .append(o)
          .trigger("change");
      });
      recsList.forEach(r => {
        let o = new Option(
          "Безымянный (ID " + data[0].ID + ")",
          data[0].ID,
          !1,
          !1
        );
        $(`[data-recommendation="${r}"]`)
          .append(o)
          .trigger("change");
      });
    });
  }
  if (action == "user_role") {
    let sendingData = new FormData();
    sendingData.append("id", id);
    sendingData.append("new_role", el.value);
    getJSON("/api/manual/updateUserMode", sendingData, data => {
      alert("Готово");
    });
  }
  if (action == "append_sup") {
    let sendingData = new FormData();
    sendingData.append("id", window.location.pathname.split("/")[2]);
    getJSON("/api/supervisors/append", sendingData, data => {
      let a = document.querySelector("#supervisors").children[0];
      a.appendChild(renderEditorSupervisorsBlock(data[0]));
      renderSelect2({
        class: ".supervisors-kur" + data[0].ID,
        ID: data[0].ID,
        r: data[0].id_request
      });
    });
  }
  if (action == "append_juri") {
    let sendingData = new FormData();
    sendingData.append("id", window.location.pathname.split("/")[2]);
    getJSON("/api/juri/append", sendingData, data => {
      let a = document.querySelector("#juri").children[0];
      a.appendChild(renderJuriBlock(data[0]));
    });
  }
  if (action == "remove_sup") {
    if (!confirm("Вы действительно хотите удалить?")) {
      return;
    }
    let sendingData = new FormData();
    sendingData.append("id", id);
    getJSON("/api/supervisors/remove", sendingData, data => {
      document.querySelector(`[data-supervisorsblock="${id}"]`).remove();
      let tmp = -1;
      for (k = 0; k < supervisorsMulti.length; k++) {
        if (parseInt(supervisorsMulti[k].ID) == id) tmp = k;
      }
      if (tmp > 0) supervisorsMulti.splice(tmp, 1);
    });
    return;
  }
  if (action == "r_name") {
    let sendingData = new FormData();
    sendingData.append("id", id);
    sendingData.append("key", action);
    sendingData.append("value", el.value);
    getJSON("/api/requests/update", sendingData, data => {
      requestsList.forEach(r => {
        if (r.id == id) r.text = el.value + " (ID " + id + ")";
      });
      supervisorsMulti.forEach(s => {
        let tmp = !1;
        $(s.class)
          .select2("val")
          .forEach(s2 => {
            if (s2 == id) tmp = !0;
          });
        $(`${s.class} option[value="${id}"]`).remove();
        let o = new Option(el.value + " (ID " + id + ")", id, tmp, tmp);
        $(s.class)
          .append(o)
          .trigger("change");
      });
      recsList.forEach(r => {
        let tmp = !1;
        $(`[data-recommendation="${r}"]`)
          .select2("val")
          .forEach(s2 => {
            if (s2 == id) tmp = !0;
          });
        $(`[data-recommendation="${r}"] option[value="${id}"]`).remove();
        let o = new Option(el.value + " (ID " + id + ")", id, tmp, tmp);
        $(`[data-recommendation="${r}"]`)
          .append(o)
          .trigger("change");
      });
      updateSelect2(0);
    });
  }
  if (action == "update_inst") {
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
  if (action == "remove_request") {
    if (
      !confirm(`Вы действительно хотите удалить ${textTpEvent[typeEvent][3]}?`)
    ) {
      return;
    }
    let sendingData = new FormData();
    sendingData.append("id", id);
    getJSON("/api/requests/remove", sendingData, data => {
      let tmp = -1;
      for (i = 0; i < requestsList.length; i++) {
        if (Number(requestsList[i].id) == id) tmp = i;
      }
      if (tmp > 0) requestsList.splice(tmp, 1);
      supervisorsMulti.forEach(s =>
        $(`${s.class} option[value="${id}"]`).remove()
      );
      recsList.forEach(r => {
        $(`[data-recommendation="${r}"] option[value="${id}"]`).remove();
      });
      countPlaces = ogr == 1 ? Math.round(requestsList.length * 0.3) : 99999999;
      updateSelect2(0);
    });
    document.querySelector(`[data-r-block="${id}"]`).remove();
    return;
  }
  if (action == "remove_u") {
    if (!confirm("Вы действительно хотите удалить участника?")) {
      return;
    }
    let sendingData = new FormData();
    sendingData.append("id", id);
    getJSON("/api/members/remove", sendingData, data => {
      document.querySelector(`[data-member-desc="${id}"]`).remove();
      document.querySelector(`[data-member-block="${id}"]`).remove();
    });
    return;
  }
  if (action == "moderator") {
    let sendingData = new FormData();
    sendingData.append("id", id);
    getJSON("/api/requests/moderator", sendingData, data => {
      document.querySelector(`[data-r-block="${id}"]`).className =
        "card card-primary card-outline";
      el.remove();
    });
  }
  if (action == "remove_event") {
    if (!confirm("Вы действительно хотите удалить мероприятие?")) {
      return;
    }
    let sendingData = new FormData();
    sendingData.append("id", id);
    getJSON("/api/events/remove", sendingData, data => {
      if (data.data) {
        window.location.replace("/events");
      } else {
        alert("У вас нет полномочий");
      }
    });
  }
  if (action == "disabled_place") {
    let sendingData = new FormData();
    sendingData.append("id", id);
    if (!el.checked) {
      if (!confirm("Все выставленные места сбросятся, сделать?")) {
        return;
      }
      requestsList.forEach(r => {
        if (r.place != 4) {
          let sendingData = new FormData();
          sendingData.append("id", r.id);
          sendingData.append("place", 4);
          getJSON("/api/requests/setPlace", sendingData, null);
          r.place = 4;
        }
      });
    }
    sendingData.append("checked", el.checked ? 1 : 0);
    getJSON("/api/events/place_dis", sendingData, data => {
      if (data.error) {
        el.checked = !1;
        alert("Невозможно");
        return;
      }
      ogr = el.checked ? 0 : 1;
      if (data.data) {
        updateSelect2(0);
      }
    });
  }
  if (action == "append") {
    let sendingData = new FormData();
    sendingData.append("id", id);
    getJSON("/api/members/append", sendingData, data => {
      let a = document.querySelector(`[data-request-member="${id}"]`);
      a.appendChild(renderMembersBlock(id, data));
    });
  }
}
