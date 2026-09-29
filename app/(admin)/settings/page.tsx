"use client"

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

export default function SettingsDashboard() {
  const [activeTab, setActiveTab] = useState("general");

  // Individual independent toggle control states
  const [autoApprove, setAutoApprove] = useState(false);
  const [requireCac, setRequireCac] = useState(true);
  const [allowGuest, setAllowGuest] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Sub navigation data configurations
  const menuItems = [
    { id: "general", label: "General", icon: Sparkles },
    { id: "roles", label: "Roles & permissions", icon: UserKey},
    // { id: "branding", label: "Branding", icon: "🛡️" },
    // { id: "blog", label: "Blog & content", icon: "📝" },
    // { id: "payments", label: "Payments & fees", icon: "💳" },
    // { id: "delivery", label: "Delivery zones", icon: "🚚" },
    // { id: "emails", label: "Email templates", icon: "✉️" },
    // { id: "security", label: "Security", icon: "🔒" },
    // { id: "api", label: "API keys & webhooks", icon: "< />" },
  ];

  return (
    <div className="flex  min-h-screen ">
      <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row gap-4">
        {/* Isolated Internal Sidebar Menu Component */}
        <SettingsSubNav
          items={menuItems}
          activeId={activeTab}
          onSelect={setActiveTab}
        />

        {/* Dynamic Main Settings Content Panel Layout */}
        {activeTab === "general" ?<div className="flex-1 flex flex-col gap-4">
          {/* Section A: Platform Details Card Layout */}
          <SettingsCard
            title="Platform details"
            description="Shown to buyers and sellers across the marketplace and in outgoing email."
          >
            <div className="grid grid-cols-2 gap-5">
              <FormInput
                label="Platform Name"
                defaultValue="AutoParts Marketplace"
              />
              <FormInput
                label="Public URL"
                defaultValue="https://autoparts.ng"
              />
              <FormInput
                label="Support Email"
                type="email"
                defaultValue="support@autoparts.ng"
              />
              <FormInput
                label="Support Phone"
                defaultValue="+234 801234 5678"
              />
              <FormSelect
                label="Timezone"
                options={["Africa/Lagos (GMT+1)", "UTC (GMT+0)"]}
              />
              <FormSelect
                label="Default Currency"
                options={["NGN — Nigerian Naira (₦)", "USD — US Dollar ($)"]}
              />
            </div>
          </SettingsCard>

          {/* Section B: Marketplace Configurations */}
          <SettingsCard
            title="Marketplace defaults"
            description="Applied to new sellers and new listings. Existing agreements are not changed retroactively."
          >
            <div className="grid grid-cols-3 gap-5 border-b border-slate-100 pb-6">
              <FormInput
                label="Commission Rate"
                defaultValue="7.5"
                suffix="%"
              />
              <FormInput
                label="Minimum Payout"
                defaultValue="10,000"
                prefixSymbol="₦"
              />
              <FormInput label="Payout Hold Period" defaultValue="3 days" />
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
        </div> : <RolesManagementView/>}
      </div>
    </div>
  );
}
