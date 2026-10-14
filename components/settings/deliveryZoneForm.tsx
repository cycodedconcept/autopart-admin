"use client";

import { useState } from "react";
import { FormInput } from "@/components/settings/formElements";
import { SettingsCard } from "@/components/settings/settingsCard";
import { useCreateDeliveryZoneMutation } from "@/lib/queries";

interface DeliveryForm {
  name: string;
  state: string;
  city: string;
}

const INITIAL_FORM: DeliveryForm = {
  name: "",
  state: "",
  city: "",
};

const DeliveryZoneForm = () => {
  const [formData, setFormData] = useState<DeliveryForm>(INITIAL_FORM);
  const createZone = useCreateDeliveryZoneMutation();

  const updateField = (key: keyof DeliveryForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const isValid =
    formData.name.trim() !== "" &&
    formData.state.trim() !== "" &&
    formData.city.trim() !== "";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;

    createZone.mutate(
      {
        data: {
          name: formData.name.trim(),
          state: formData.state.trim(),
          city: formData.city.trim(),
        },
      },
      { onSuccess: () => setFormData(INITIAL_FORM) },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
      <SettingsCard
        title="Add delivery zone"
        description="Delivery zones define the areas logistics partners can be assigned to."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FormInput
            label="Zone Name"
            placeholder="e.g. Surulere Hub"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            required
          />
          <FormInput
            label="State"
            placeholder="e.g. Lagos"
            value={formData.state}
            onChange={(e) => updateField("state", e.target.value)}
            required
          />
          <FormInput
            label="City"
            placeholder="e.g. Lawanson"
            value={formData.city}
            onChange={(e) => updateField("city", e.target.value)}
            required
          />
        </div>
      </SettingsCard>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={!isValid || createZone.isPending}
          className={`${!isValid || createZone.isPending ? "bg-agray opacity-30 text-dark" : "bg-aorange hover:bg-orange-600 cursor-pointer text-white"} text-sm font-medium py-2 px-6 rounded-lg  transition-colors `}
        >
          {createZone.isPending ? "Saving..." : "Add Zone"}
        </button>
      </div>
    </form>
  );
};

export default DeliveryZoneForm;
