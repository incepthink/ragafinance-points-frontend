import {
  ReactNode,
  ReactPortal,
  useCallback,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";

import styles from "./Modal.module.css";
import { clsx } from "clsx";
import IconButton from "@/components/IconButton";
import { IoMdClose } from "react-icons/io";
import { useScrollLock } from "usehooks-ts";

type ModalProps = {
  title: string | ReactNode;
  titleClassName?: string;
  children: ReactNode;
  className?: string;
  onClose?: VoidFunction;
};

type ReturnType = (props: ModalProps) => ReactPortal | null;

const useModal = (): [ReturnType, () => void, () => void] => {
  const [isOpen, setIsOpen] = useState(false);

  const { lock, unlock } = useScrollLock({ autoLock: false });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const openModal = useCallback(() => {
    setIsOpen(true);
    lock();
  }, [lock]);
  const closeModal = useCallback(() => {
    setIsOpen(false);
    unlock();
  }, [unlock]);

  const Modal = ({
    title,
    titleClassName,
    children,
    className,
    onClose,
  }: ModalProps) =>
    isOpen
      ? createPortal(
          <>
            <div
              className={styles.modalBackdrop}
              onClick={() => {
                if (onClose) {
                  onClose();
                }
                closeModal();
              }}
              style={{ display: "flex" }}
            />
            <div
              className="justify-center items-center w-full h-full"
              style={{ zIndex: "100" }}
            >
              {/* <div className="w-10 h-24 bg-blue-400"></div> */}
              <div
                // style={{
                //   boxShadow: "inset 0px 0px 5px 5px rgba(255,255,255,0.1)",
                // }}
                //inset-shadow-sm inset-shadow-white/20 ring ring-white/50 inset-ring inset-ring-white/100
                className={clsx(
                  "bg-[#F27151] backdrop-blur-2xl absolute -translate-x-1/2 -translate-y-1/2",
                  styles.modalWindow,
                  className
                )}
              >
                <div className={styles.modalHeading}>
                  <div className={clsx(styles.modalTitle, titleClassName)}>
                    {title}
                  </div>
                  <IconButton
                    onClick={() => {
                      if (onClose) {
                        onClose();
                      }
                      closeModal();
                    }}
                  >
                    <IoMdClose />
                  </IconButton>
                </div>
                {children}
              </div>
            </div>
          </>,
          document.body
        )
      : null;

  return [Modal, openModal, closeModal];
};

export default useModal;
