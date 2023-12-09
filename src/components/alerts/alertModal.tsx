"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@app/components/ui/alert-dialog";
import IconifyIcon from "../icon";

interface IAlertModal {
  open: boolean;
  message?: string;
  title?: string;
  onCancel: () => void;
  busy?: boolean;
  onContinue: () => void;
}

const AlertModal: React.FC<IAlertModal> = ({
  open = false,
  message = "",
  title = "",
  onCancel,
  busy = false,
  onContinue,
}) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title ? title : "Are you absolutely sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {message
              ? message
              : "This action cannot be undone. This will permanently delete record from the server."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={busy} onClick={onCancel}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={busy} onClick={onContinue}>
            <div className="flex items-center gap-1">
              <span>Continue</span>
              {busy && (
                <IconifyIcon
                  icon="svg-spinners:180-ring-with-bg"
                  fontSize={15}
                />
              )}
            </div>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertModal;
