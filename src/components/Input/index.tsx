import React, {forwardRef, useState} from "react";
import "react-calendar/dist/Calendar.css";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {IMaskInput} from "react-imask";
import styles from "./input.module.css";

type InputType = "text" | "password" | "year" | "email" | "number" | string;

interface InputFieldProps {
    value?: string | number;
    label?: string;
    placeholder?: string;
    type?: InputType;
    id?: string;
    width?: string;
    icon?: React.ReactNode | null;
    onChange?: (eventOrValue: React.ChangeEvent<HTMLInputElement> | string | number) => void;
    mask?: string | null;
    isDisabled?: boolean;
    required?: boolean;
    className?: string;
    maxLength?: number;
    minLength?: number;
    error?: string | undefined;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
    const {
        value,
        label,
        placeholder = "",
        type = "text",
        id,
        width = "100%",
        icon = null,
        onChange,
        mask = null,
        isDisabled = false,
        required = false,
        className = "",
        maxLength,
        minLength,
        error = undefined,
    } = props;

    const [view, setView] = useState<"password" | "text">("password");
    let filteredType: string;
    switch (type) {
        case "password":
            filteredType = view;
            break;
        case "year":
            filteredType = "text";
            break;
        default:
            filteredType = type;
            break;
    }

    return (
        <div
            className={`${styles.input_container} ${error ? styles.error : ""}`}
            style={{
                width: "100%",
                maxWidth: width,
                marginTop: label ? "1.6rem" : "0.4rem",
            }}
        >
            {label && (
                <label htmlFor={id} className="link " style={{fontWeight: "700"}}>
                    {label}
                    {required && <span className="text-[red]"> *</span>}
                </label>
            )}

            <>
                {!mask ? (
                    <input
                        value={value}
                        type={filteredType}
                        name={id}
                        id={id}
                        className={`text ${className}`}
                        placeholder={`${placeholder}...`}
                        onChange={(e) => onChange?.(e)}
                        disabled={isDisabled}
                        required={required}
                        minLength={minLength}
                        maxLength={maxLength}
                        ref={ref}
                    />
                ) : (
                    <IMaskInput
                        mask={mask}
                        value={typeof value === "number" ? value.toString() : value}
                        name={id}
                        id={id}
                        className={`text ${className}`}
                        placeholder={`${placeholder}...`}
                        disabled={isDisabled}
                        required={required}
                        minLength={minLength}
                        inputRef={ref as React.Ref<HTMLInputElement>}
                        onAccept={(val: string) => onChange?.(val)}
                    />
                )}
            </>


            {icon && <span className={styles.icon}>{icon}</span>}

            {type === "password" && (
                <div
                    className={styles.icon}
                    onClick={() => {
                        if (view === "password") {
                            setView("text");
                        } else {
                            setView("password");
                        }
                    }}
                >
                    {view === "password" ? <FaEye/> : <FaEyeSlash/>}
                </div>
            )}
            {error && (
                <span className={`link text-[red] text-[12px] mt-1 ${styles.errorMessage}`}>{error}</span>
            )}
        </div>
    );
});

export default InputField;
