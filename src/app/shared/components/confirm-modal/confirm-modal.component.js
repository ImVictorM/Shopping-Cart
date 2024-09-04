angular
  .module("shared.components.confirmModal")
  .component("confirmModal", {
    bindings: {
      onConfirm: "&",
      onCancel: "&",
      title: "@",
      show: "="
    },
    transclude: true,
    templateUrl: "app/shared/components/confirm-modal/confirm-modal.template.html",
    controller: [
      function ConfirmModalController() {
        const ctrl = this;

        ctrl.handleOnConfirm = function () {
          if (ctrl.onConfirm) {
            ctrl.onConfirm();
          }

          ctrl.show = false;
        }

        ctrl.handleOnCancel = function () {
          if (ctrl.onCancel){ 
            ctrl.onCancel()
          }

          ctrl.show = false;
        }

        ctrl.handleOnClose = function () {
          ctrl.show = false;
        }
      }
    ],
  });  