import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { twJoin, twMerge } from "tailwind-merge";
import { mdiCloseCircleOutline } from "@mdi/js";
import { Button } from "./ui/button";

export interface InputProps {
  id: string;
  type?: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  small?: boolean;
  required?: boolean;
  message?: string | string[];
  className?: string;
  error?: boolean;
  value?: string;
  full?: boolean;
  deletable?: boolean;
  iconButton?: string;
  iconButtonTitle?: string;
  onClickIconButton?: () => void;
  maxLength?: number;
  readonly?: boolean;
  onClickDelete?: () => void;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  register: UseFormRegister<FieldValues>;
  autoComplete?: string;
  size?: {
    width?: number;
    height?: number;
  };
  fontSize?: number;
  disableNumberArrow?: boolean;
  textAlign?:
    | "start"
    | "end"
    | "left"
    | "right"
    | "center"
    | "justify"
    | "match-parent";
  autofocus?: boolean;
  datetimeLocal?: {
    min?: string | undefined;
    max?: string | undefined;
    setPlaceholderColor?: boolean;
  };
}

export const Input: React.FC<InputProps> = ({
  id,
  type = "text",
  small,
  full,
  className,
  error,
  readonly,
  deletable = false,
  iconButton,
  iconButtonTitle,
  onClickIconButton,
  onClickDelete,
  register,
  size,
  fontSize,
  disableNumberArrow = false,
  textAlign,
  autofocus = false,
  datetimeLocal = {
    min: undefined,
    max: undefined,
    setPlaceholderColor: false,
  },
  ...props
}: InputProps) => {
  const TagName = type === "textarea" ? "textarea" : "input";
  const onClickDeleteButton = () => {
    onClickDelete ? onClickDelete() : "";
  };

  if (deletable) {
    // deletable を iconButton プロパティに移行 (v0.1.78)
    iconButton = mdiCloseCircleOutline;
    iconButtonTitle = "削除";
    onClickIconButton = onClickDeleteButton;
  }

  return (
    <>
      {" "}
      <label className={className}>
        {" "}
        {props.label ? (
          <span className="mb-1 block text-xs font-normal">
            {props.label}{" "}
            {props.required ? (
              <span className="ml-2 text-red-500">※required</span>
            ) : (
              ""
            )}{" "}
          </span>
        ) : (
          ""
        )}{" "}
        <TagName
          readOnly={readonly}
          type={type}
          className={twMerge(
            "border border-gray-300 font-normal placeholder:text-gray-300 read-only:bg-gray-100 read-only:opacity-75 focus:border-gray-300  focus:ring-2 focus:ring-cyan-100 disabled:bg-gray-100 disabled:opacity-75",
            small
              ? "h-6 w-60 rounded text-xs"
              : "h-9 w-[400px] rounded-md text-base",
            full ? "w-full" : "",
            type === "textarea" ? "h-40 text-sm" : "",
            error ? "ring-2 ring-rose-300" : "",
            iconButton
              ? full
                ? small
                  ? "w-[calc(100%-1.5rem)]"
                  : "w-[calc(100%-2.25rem)]"
                : small
                ? "w-[13.5rem]"
                : "w-[calc(400px-2.25rem)]"
              : "",
            disableNumberArrow ? "no-spin [appearance:textfield]" : "",
            datetimeLocal.setPlaceholderColor ? "text-gray-300" : ""
          )}
          style={{ ...size, fontSize, textAlign }} // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autofocus}
          min={datetimeLocal.min}
          max={datetimeLocal.max}
          {...register(id)}
          {...props}
        />{" "}
        {iconButton ? (
          <Button
            className={twJoin(
              "m-0 inline align-bottom hover:bg-transparent focus:outline-none active:ring-0",
              small ? "h-6 w-6" : ""
            )}
            variant="outline"
            size="icon"
            onClick={onClickIconButton}
          >
            <i className="text-white hover:text-gray-300" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
            </i>
          </Button>
        ) : (
          ""
        )}
        {props.message ? (
          <span
            className={twJoin(
              "mt-1 block text-xs font-normal text-red-500",
              small ? "w-60" : ""
            )}
          >
            {" "}
            {typeof props.message === "string"
              ? props.message
              : props.message.map((message, index) => {
                  return (
                    <span className="block text-inherit" key={index}>
                      {message}{" "}
                    </span>
                  );
                })}{" "}
          </span>
        ) : (
          ""
        )}{" "}
      </label>{" "}
    </>
  );
};
