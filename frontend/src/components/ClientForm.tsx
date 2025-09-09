import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { isValidPhoneNumber } from "libphonenumber-js";
import "react-phone-input-2/lib/style.css";
import type { Client } from "../types/client";

export type FormValues = Omit<Client, "id" | "createdAt">;

interface ClientFormProps {
    defaultValues?: Partial<FormValues>;
    onSubmit: (data: FormValues) => void;
    isPending?: boolean;
    title: string;
}

export default function ClientForm({ defaultValues, onSubmit, isPending = false, title }: ClientFormProps) {
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues,
        mode: "onChange",
    });

    useEffect(() => {
        if (defaultValues) reset(defaultValues);
    }, [defaultValues, reset]);

    return (
        <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
            <h2>{title}</h2>

            <label className="label" htmlFor="name">Full name:</label>
            <input
                className="input-item"
                id="name"
                placeholder="Full name"
                type="text"
                {...register("name", {
                    required: "This field is required.",
                    minLength: { value: 5, message: "Minimum 5 characters." },
                    pattern: {
                        value: /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/,
                        message: "Use only Latin letters, spaces, apostrophes or hyphens."
                    }
                })}
                aria-invalid={!!errors.name}
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

            <label className="label" htmlFor="email">Email:</label>
            <input
                className="input-item"
                id="email"
                type="email"
                placeholder="Your email"
                {...register("email", {
                    required: "This field is required.",
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email address.",
                    },
                })}
                aria-invalid={!!errors.email}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

            <label className="label" htmlFor="phone">Phone:</label>
            <Controller
                name="phone"
                control={control}
                rules={{
                    required: "This field is required.",
                    validate: (value) =>
                        (value && isValidPhoneNumber(value)) || "Invalid phone number.",
                }}
                render={({ field }) => (
                    <PhoneInput
                        {...field}
                        country={"ua"}
                        preferredCountries={['ua','pl','de','gb','us']}
                        inputProps={{ name: 'phone', id: 'phone', autoComplete: 'tel' }}
                        inputClass="input-item"
                        placeholder="+380..."
                        onChange={(val, _) => {
                            const e164 = val ? `+${val}` : "";
                            field.onChange(e164);
                        }}
                        value={field.value || ""}
                    />
                )}
            />
            {errors.phone && <p style={{ color: "red" }}>{errors.phone.message}</p>}

            <label className="label" htmlFor="company">Company:</label>
            <input
                className="input-item"
                id="company"
                type="text"
                placeholder="Company"
                {...register("company")}
            />

            <label className="label" htmlFor="position">Position:</label>
            <input
                className="input-item"
                id="position"
                type="text"
                placeholder="Position"
                {...register("position")}
            />

            <div className="checkbox-wrapper">
                <input type="checkbox" id="isVip" {...register("isVip")} />
                <label htmlFor="isVip">VIP client</label>
            </div>

            <label className="label" htmlFor="status">Status:</label>
            <select id="status" {...register("status")}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="awaiting_payment">Awaiting payment</option>
                <option value="debtor">Debtor</option>
            </select>

            <button type="submit" className="button" disabled={isPending}>
                {isPending ? "Saving..." : "Save Client"}
            </button>
        </form>
    );
}
