"use server";

import { revalidatePath } from "next/cache";

export type ActionResult = {
  success: boolean;
  message: string;
};

const ensureValue = (value: FormDataEntryValue | null) =>
  typeof value === "string" ? value.trim() : "";

const simulateSend = async (payload: Record<string, string>) => {
  console.log("ACE form submission", payload);
};

const validateFields = (fields: Record<string, string>, required: string[]): string | null => {
  for (const key of required) {
    if (!fields[key]) {
      return `${key} is required`;
    }
  }
  return null;
};

export async function submitContact(prevState: ActionResult | undefined, formData: FormData) {
  const payload = {
    name: ensureValue(formData.get("name")),
    email: ensureValue(formData.get("email")),
    message: ensureValue(formData.get("message"))
  };
  const error = validateFields(payload, ["name", "email", "message"]);
  if (error) return { success: false, message: error };
  await simulateSend(payload);
  revalidatePath("/");
  return { success: true, message: "Message received. We reply within 24–48h." };
}

export async function submitStayRequest(
  prevState: ActionResult | undefined,
  formData: FormData
) {
  const payload = {
    property: ensureValue(formData.get("property")),
    name: ensureValue(formData.get("name")),
    email: ensureValue(formData.get("email")),
    dates: ensureValue(formData.get("dates")),
    guests: ensureValue(formData.get("guests")),
    notes: ensureValue(formData.get("notes") ?? "")
  };
  const error = validateFields(payload, ["property", "name", "email", "dates", "guests"]);
  if (error) return { success: false, message: error };
  await simulateSend(payload);
  return { success: true, message: "Availability request sent. We will follow up shortly." };
}

export async function submitDirectOffer(
  prevState: ActionResult | undefined,
  formData: FormData
) {
  const payload = {
    property: ensureValue(formData.get("property")),
    name: ensureValue(formData.get("name")),
    email: ensureValue(formData.get("email")),
    channel: ensureValue(formData.get("channel") ?? "direct")
  };
  const error = validateFields(payload, ["property", "name", "email"]);
  if (error) return { success: false, message: error };
  await simulateSend(payload);
  return { success: true, message: "Direct offer request sent. Expect a tailored proposal." };
}

export async function submitInvestRequest(
  prevState: ActionResult | undefined,
  formData: FormData
) {
  const payload = {
    opportunity: ensureValue(formData.get("opportunity")),
    name: ensureValue(formData.get("name")),
    email: ensureValue(formData.get("email")),
    intent: ensureValue(formData.get("intent") ?? ""),
    timeline: ensureValue(formData.get("timeline") ?? "")
  };
  const error = validateFields(payload, ["opportunity", "name", "email"]);
  if (error) return { success: false, message: error };
  await simulateSend(payload);
  return { success: true, message: "Request received. We will share the dossier securely." };
}

export async function submitConcierge(
  prevState: ActionResult | undefined,
  formData: FormData
) {
  const payload = {
    name: ensureValue(formData.get("name")),
    email: ensureValue(formData.get("email")),
    stay: ensureValue(formData.get("stay") ?? ""),
    interest: ensureValue(formData.get("interest") ?? "")
  };
  const error = validateFields(payload, ["name", "email"]);
  if (error) return { success: false, message: error };
  await simulateSend(payload);
  return { success: true, message: "Concierge note saved. We will curate options for you." };
}
