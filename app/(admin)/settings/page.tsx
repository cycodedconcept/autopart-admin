"use client";

import { useState } from "react";
import {
  FormInput,
  FormSelect,
  ToggleRow,
} from "@/components/settings/formElements";
import {
  SettingsCard,
  SettingsSubNav,
} from "@/components/settings/settingsCard";
import { Sparkles, UserKey } from "lucide-react";
import { RolesManagementView } from "@/components/settings/roleManagementView";
import { useUpdatePlatformSettingsMutation } from "@/lib/queries";

// Structure mirroring your expected API body
interface ApiConfigData {
  commissionRateDefault: number;
  commissionRatesByCategory: Array<{ categoryId: number; ratePercent: number }>;
  commissionRatesBySellerTier: Array<{ tier: string; ratePercent: number }>;
  platformSettings: {
    payoutBatchCutoffHour: number;
  };
  commissionRateCategory: number;
  categoryId: number;
  commissionRateSeller: number;
  // Other existing form fields
  platformName: string;
  tier: string;
  publicUrl: string;
  supportEmail: string;
  supportPhone: string;
  timezone: string;
  defaultCurrency: string;
  minimumPayout: string;
  payoutHoldPeriod: string;
}

export default function SettingsDashboard() {
  const [activeTab, setActiveTab] = useState("general");

  // 1. Unified state reflecting your targeted API body and form fields
  const [formData, setFormData] = useState<ApiConfigData>({
    commissionRateDefault: 0, // Used in "Marketplace defaults"
    commissionRatesByCategory: [],
         categoryId: 0, 
            commissionRateCategory: 0 ,
    commissionRatesBySellerTier: [],
         tier: "", commissionRateSeller: 0 ,
    
    platformSettings: {
      payoutBatchCutoffHour: 0, 
    },
    platformName: "",
    publicUrl: "",
    supportEmail: "",
    supportPhone: "",
    timezone: "",
    defaultCurrency: "",
    minimumPayout: "",
    payoutHoldPeriod: "",
  });

  // Individual independent toggle control states
  const [autoApprove, setAutoApprove] = useState(false);
  const [requireCac, setRequireCac] = useState(true);
  const [allowGuest, setAllowGuest] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Generic value updater for shallow root keys
  const updateField = (key: keyof ApiConfigData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const menuItems = [
    { id: "general", label: "General", icon: Sparkles },
    { id: "roles", label: "Roles & permissions", icon: UserKey },
  ];

  const updateSettings = useUpdatePlatformSettingsMutation()
  // Handler to pack everything together for your API submission
  const handleSave = () => {
    
  const payload = {
    commissionRateDefault: Number(formData.commissionRateDefault),
    commissionRatesByCategory: [{categoryId: formData.categoryId, ratePecent:formData.commissionRateCategory}],
    commissionRatesBySellerTier: [{tier: formData.tier, ratePecent:formData.commissionRateSeller}],
    
    // Maps the dashboard configuration directly to platformSettings
    platformSettings: {
      payoutBatchCutoffHour: formData.platformSettings.payoutBatchCutoffHour,
      platformName: formData.platformName,
      publicUrl: formData.publicUrl,
      supportEmail: formData.supportEmail,
      supportPhone: formData.supportPhone,
      timezone: formData.timezone,
      defaultCurrency: formData.defaultCurrency,
      minimumPayout: formData.minimumPayout,
      payoutHoldPeriod: formData.payoutHoldPeriod,
      toggles: { 
        autoApprove, 
        requireCac, 
        allowGuest, 
        maintenanceMode 
      }
    }
  };

    updateSettings.mutate({settings:payload})
  };

  return (
    <div className="flex min-h-screen ">
      <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row gap-4">
        <SettingsSubNav
          items={menuItems}
          activeId={activeTab}
          onSelect={setActiveTab}
        />

        {activeTab === "general" ? (
          <div className="flex-1 flex flex-col gap-4">
            {/* Section A: Platform Details Card Layout */}
            <SettingsCard
              title="Platform details"
              description="Shown to buyers and sellers across the marketplace and in outgoing email."
            >
              <div className="grid grid-cols-2 gap-5">
                <FormInput
                  label="Platform Name"
                  value={formData.platformName}
                  onChange={(e) => updateField("platformName", e.target.value)}
                />
                <FormInput
                  label="Public URL"
                  value={formData.publicUrl}
                  onChange={(e) => updateField("publicUrl", e.target.value)}
                />
                <FormInput
                  label="Support Email"
                  type="email"
                  value={formData.supportEmail}
                  onChange={(e) => updateField("supportEmail", e.target.value)}
                />
                <FormInput
                  label="Support Phone"
                  value={formData.supportPhone}
                  onChange={(e) => updateField("supportPhone", e.target.value)}
                />
                <FormSelect
                  label="Timezone"
                  options={["Africa/Lagos (GMT+1)", "UTC (GMT+0)"]}
                  value={formData.timezone}
                  onChange={(e) => updateField("timezone", e.target.value)}
                />
                <FormSelect
                  label="Default Currency"
                  options={["NGN — Nigerian Naira (₦)", "USD — US Dollar ($)"]}
                  value={formData.defaultCurrency}
                  onChange={(e) => updateField("defaultCurrency", e.target.value)}
                />
              </div>
            </SettingsCard>

            {/* Section B: Marketplace Configurations */}
            <SettingsCard
              title="Marketplace defaults"
              description="Applied to new sellers and new listings. Existing agreements are not changed retroactively."
            >
              <div className="grid grid-cols-3 gap-5 border-b border-slate-100">
                <FormInput
                  label="Commission Rate Category"
                  type="number"
                  value={formData.commissionRateCategory}
                  onChange={(e) => updateField("commissionRateCategory", e.target.value)}
                  suffix="%"
                />
                <FormInput
                  label="Minimum Payout"
                  value={formData.minimumPayout}
                  onChange={(e) => updateField("minimumPayout", e.target.value)}
                  prefixSymbol="₦"
                />
                <FormInput 
                  label="Payout Hold Period" 
                  value={formData.payoutHoldPeriod} 
                  onChange={(e) => updateField("payoutHoldPeriod", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-3 gap-5 border-b border-slate-100 pb-6">
                <FormInput
                  label="Commission Rate Seller"
                  type="number"
                  value={formData.commissionRateSeller}
                  onChange={(e) => updateField("commissionRateSeller", e.target.value)}
                  suffix="%"
                />
                <FormInput
                  label="Tier"
                  value={formData.tier}
                  onChange={(e) => updateField("tier", e.target.value)}
                  
                />
                {/* <FormInput 
                  label="Payout Hold Period" 
                  value={formData.payoutHoldPeriod} 
                  onChange={(e) => updateField("payoutHoldPeriod", e.target.value)}
                /> */}
              </div>

              <div className="flex flex-col gap-6 pt-2">
                <ToggleRow
                  title="Auto-approve new sellers"
                  description="When off, every seller passes through the verification queue before they can list. Recommended."
                  enabled={autoApprove}
                  onChange={setAutoApprove}
                />
                <ToggleRow
                  title="Require CAC verification for wholesalers"
                  description="Distributors and wholesalers must submit a CAC number, checked through Dojah before approval."
                  enabled={requireCac}
                  onChange={setRequireCac}
                />
                <ToggleRow
                  title="Allow guest checkout"
                  description="Buyers can order without creating an account. Order tracking is then by reference and email only."
                  enabled={allowGuest}
                  onChange={setAllowGuest}
                />
              </div>
            </SettingsCard>

            {/* Section C: Danger Zone/Maintenance State Card */}
            <SettingsCard title="Maintenance mode" alertTitle>
              <ToggleRow
                title="Take the storefront offline"
                description="Buyers and sellers will see a maintenance notice. The admin panel stays reachable. In-flight orders are unaffected, but no new orders can be placed."
                enabled={maintenanceMode}
                onChange={setMaintenanceMode}
              />
            </SettingsCard>

            {/* Action Bar */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleSave}
                disabled={updateSettings.isPending}
                className={`${updateSettings.isPending? "bg-agray opacity-30 text-dark" : "bg-aorange hover:bg-orange-600 cursor-pointer text-white"} text-sm font-medium py-2 px-6 rounded-lg  transition-colors `}
              >
                {updateSettings.isPending? "Saving..." :"Save Settings"}
              </button>
            </div>
          </div>
        ) : (
          <RolesManagementView />
        )}
      </div>
    </div>
  );
}
