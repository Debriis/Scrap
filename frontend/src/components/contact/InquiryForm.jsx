import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowUpRight, LoaderCircle, CheckCircle2 } from "lucide-react";
import { materials } from "../../data/materials";
import { business } from "../../config/business";
import { api } from "../../services/api";
export default function InquiryForm() {
  const [params] = useSearchParams();
  const selected = params.get("material");
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    material: materials.some((m) => m.slug === selected) ? selected : "",
    quantity: "",
    location: "",
    message: "",
    website: "",
  });
  const [state, setState] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState({});
  const update = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    if (state !== "loading") setState("idle");
  };
  const validate = () => {
    const e = {};
    if (values.name.trim().length < 2) e.name = "Please enter your full name.";
    if (!/^(?:\+91)?[6-9]\d{9}$/.test(values.phone.replace(/[\s()-]/g, "")))
      e.phone = "Enter a valid 10-digit Indian mobile number.";
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      e.email = "Enter a valid email address.";
    if (!values.material) e.material = "Please choose a material.";
    if (values.location.trim().length < 2)
      e.location = "Please enter your location.";
    if (values.message.trim().length < 10)
      e.message = "Please add at least 10 characters about your material.";
    setErrors(e);
    return !Object.keys(e).length;
  };
  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setState("loading");
    setFeedback("");
    try {
      const { data } = await api.post("/inquiries", values);
      setState("success");
      setFeedback(data.message);
    } catch (error) {
      setState("error");
      const serverErrors = error.response?.data?.errors;
      if (serverErrors) setErrors(serverErrors);
      setFeedback(
        error.response?.data?.message ||
          "Your inquiry could not be confirmed. Please try again or contact us by phone or WhatsApp.",
      );
    }
  };
  const whatsapp = () => {
    if (!validate()) return;
    const material =
      materials.find((m) => m.slug === values.material)?.name ||
      "Other recyclable material";
    const message = `Hello Ankit Trading Company,\n\nName: ${values.name.trim()}\nPhone: ${values.phone}\n${values.email ? `Email: ${values.email}\n` : ""}Material: ${material}\nQuantity: ${values.quantity || "To be discussed"}\nLocation: ${values.location.trim()}\n\n${values.message.trim()}`;
    window.open(
      `${business.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };
  const field = (
    name,
    label,
    required = true,
    type = "text",
    maxLength = 150,
  ) => (
    <div className="field">
      <label htmlFor={name}>
        {label}
        {required && <span> *</span>}
      </label>
      <input
        id={name}
        name={name}
        value={values[name]}
        onChange={update}
        type={type}
        required={required}
        maxLength={maxLength}
        autoComplete={
          {
            name: "name",
            phone: "tel",
            email: "email",
            location: "address-level2",
          }[name]
        }
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
      {errors[name] && (
        <span className="field-error" id={`${name}-error`}>
          {errors[name]}
        </span>
      )}
    </div>
  );
  return (
    <form className="inquiry-form" onSubmit={submit} noValidate>
      <span className="eyebrow">SEND AN INQUIRY</span>
      <h2>
        Tell us what’s next<span className="red">.</span>
      </h2>
      <p className="small muted form-note">Fields marked * are required.</p>
      <fieldset disabled={state === "loading"}>
        <div className="form-grid">
          {field("name", "Full name")}
          {field("phone", "Phone number", true, "tel", 20)}
          {field("email", "Email", false, "email", 200)}
          <div className="field">
            <label htmlFor="material">
              Material type <span>*</span>
            </label>
            <select
              id="material"
              name="material"
              required
              value={values.material}
              onChange={update}
              aria-invalid={!!errors.material}
              aria-describedby={errors.material ? "material-error" : undefined}
            >
              <option value="">Select a material</option>
              {materials.map((m) => (
                <option key={m.slug} value={m.slug}>
                  {m.name}
                </option>
              ))}
              <option value="other">Other — subject to confirmation</option>
            </select>
            {errors.material && (
              <span className="field-error" id="material-error">
                {errors.material}
              </span>
            )}
          </div>
          {field("quantity", "Approximate quantity", false, "text", 100)}
          {field("location", "Location", true, "text", 200)}
        </div>
        <div className="field">
          <label htmlFor="message">
            Tell us about your material <span>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={3000}
            required
            value={values.message}
            onChange={update}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            placeholder="Type, condition, and anything else we should know…"
          />
          {errors.message && (
            <span className="field-error" id="message-error">
              {errors.message}
            </span>
          )}
        </div>
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">Leave this empty</label>
          <input
            id="website"
            name="website"
            value={values.website}
            onChange={update}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <p className="privacy-note">
          By sending, you agree that we may use these details to respond to your
          inquiry. They are stored privately and are not displayed on this
          website.
        </p>
        <div className="form-actions">
          <button className="button" type="submit">
            {state === "loading" ? (
              <>
                <LoaderCircle className="loading" size={18} />
                Saving inquiry…
              </>
            ) : (
              <>
                Send Inquiry <ArrowUpRight size={18} />
              </>
            )}
          </button>
          <button type="button" className="text-link" onClick={whatsapp}>
            Send via WhatsApp <ArrowUpRight size={18} />
          </button>
        </div>
      </fieldset>
      <div aria-live="polite" aria-atomic="true">
        {feedback && (
          <p
            className={`feedback ${state}`}
            role={state === "error" ? "alert" : undefined}
          >
            {state === "success" && <CheckCircle2 size={20} />} {feedback}
          </p>
        )}
      </div>
    </form>
  );
}
