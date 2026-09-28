"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, PlusIcon } from "lucide-react";

import { DataTable, Column } from "@/components/riders/dataTable";
import { StatusBadge } from "@/components/atoms/statusBadge";
import MetricCard from "@/components/dashboard/metricCard";
import { SearchInput } from "@/components/atoms/searchInputs";
import { Pagination } from "@/components/atoms/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { RiderProfileDrawer } from "@/components/riders/riderProfile";
import {
  useApproveLogisticCompany,
  useCompanyQuery,
  useCompanyRiderQuery,
  useOnboardPartnerMutation,
} from "@/lib/queries";
import { CompanyModal } from "@/components/riders/companyModal";
import { OnboardPartnerPayload } from "@/types/company";
import { ActionWithReasonModal } from "@/components/verification/actionWithReason";

// Mock Interfaces
interface CompanyData {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  status: string;
}

interface RiderData {
  id: number;
  fullName: string;
  phone: string;
  company: CompanyData;
  companyId: number;
  accountStatus: string;
  vehicleType: string;
  status: string;
  zone: {
    state: string;
    city: string;
  };
}

export default function RidersAndLogistics() {
  const [activeTab, setActiveTab] = useState<"companies" | "riders">(
    "companies",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const searchParams = useSearchParams();
  const selectedCompanyId = Number(searchParams.get("id"));
  const selectedRiderId = Number(searchParams.get("riderid"));
  const openDetails = Boolean(selectedCompanyId);
  const openDetailsRider = Boolean(selectedRiderId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState<number | null>(null);
  const [modalConfig, setModalConfig] = useState<{
    type: string | null;
    title: string;
    description: string;
    placeholder?: string;
    color?: string;
    label: string;
  }>({
    type: null,
    title: "",
    description: "",
    placeholder: "",
    color: "",
    label: "",
  });

  const {
    data: companies,
    isLoading,
    isError,
    error,
  } = useCompanyQuery(page, openDetails ? "all" : filter, searchTerm, {
    enabled: !openDetails,
  });
  const { data: riders } = useCompanyRiderQuery(
    page,
    !openDetails ? "all" : filter,
    !openDetails ? null : selectedCompanyId.toString(),
    {
      enabled: openDetails && !!selectedCompanyId,
    },
  );
  const handleSearchChange = (newVal: string) => {
    setSearchTerm(newVal);
    setPage(1); // Reset page safely to index 1 if search query changes
  };

  const totalPagesCount = 1;
  const companySummary = companies?.data?.summary;

  const filteredData = useMemo(() => {
    if (openDetails) return [];

    return companies?.data?.companies?.filter((user) => {
      const matchesSearch =
        user?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ?? false;

      const matchesTab =
        filter === "all" ||
        user?.status?.toLowerCase() === filter.toLowerCase();

      return matchesSearch && matchesTab;
    });
  }, [openDetails, companies, searchTerm, filter]);

  const filteredRiders = useMemo(() => {
    if (!openDetails) return [];

    return riders?.data?.riders?.filter((user) => {
      const matchesSearch =
        user?.fullName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ??
        false;

      const matchesTab =
        filter === "all" ||
        user?.status?.toLowerCase() === filter.toLowerCase();

      return matchesSearch && matchesTab;
    });
  }, [openDetails, riders, searchTerm, filter]);

  // Column Definitions
  const companyColumns: Column<CompanyData>[] = [
    {
      header: "Company",
      accessor: (d) => <span>{d.name}</span>,
    },
    { header: "Address", accessor: (d) => d.address },
    { header: "Email", accessor: (d) => d.email },
    { header: "Phone", accessor: (d) => d.phone },

    { header: "Status", accessor: (d) => <StatusBadge status={d.status} /> },
  ];

  const riderColumns: Column<RiderData>[] = [
    {
      header: "Rider",
      accessor: (d) => (
        <span className="font-semibold text-gray-900">{d.fullName}</span>
      ),
    },
    { header: "Phone", accessor: (d) => d.phone },
    { header: "Company", accessor: (d) => d.company.name },
    { header: "City", accessor: (d) => d.zone.city },
    {
      header: "Vehicle Type",
      accessor: (d) => d.vehicleType,
      // align: "center",
    },
    // {
    //   header: "Rating",
    //   accessor: (d) => (
    //     <span className="inline-flex items-center gap-1 font-medium text-gray-800">
    //       <Star size={14} className="fill-amber-400 text-amber-400" />{" "}
    //       {d.rating.toFixed(1)}
    //     </span>
    //   ),
    // },
    { header: "Zone", accessor: (d) => d.zone.state },
    {
      header: "Account Status",
      accessor: (d) => <StatusBadge status={d.accountStatus} />,
    },
    {
      header: "Status",
      accessor: (d) => <StatusBadge status={d.status} />,
    },
  ];

  const {
    mutate: onboardPartner,
    isPending,
    error: err,
  } = useOnboardPartnerMutation();
  const approveCompany = useApproveLogisticCompany();

  const handleOnboardSubmit = (formData: OnboardPartnerPayload) => {
    onboardPartner(formData, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
    });
  };

  const handleCloseProfile = () => {
    setFilter("all");
    // Clears the query parameter to return back to the table view
    router.push("/users/riders-logistics", { shallow: true } as any);
  };

  const handleAction = (id: number, action: string) => {
    if (action.toLowerCase() === "view rider profile") {
      return router.push(`/users/riders-logistics?id=${id}`, {
        shallow: true,
      } as any);
    } else {
      setId(id);

      openReasonModal("approve company");
    }
  };
  const handleRiders = (id: number, action: string) => {
    if (action.toLowerCase() === "view profile") {
      setIsDrawerOpen(true);
      return router.push(
        `/users/riders-logistics?id=${selectedCompanyId}&riderid=${id}`,
        {
          shallow: true,
        } as any,
      );
    }
  };

  const openReasonModal = (type: string) => {
    if (type === "approve company") {
      setModalConfig({
        type: "approve company",
        title: "Approve Company",
        description: `Are you sure to approve?`,

        color: "bg-aorange border-aorange",
        label: "Approve",
      });
    }
  };

  const handleActionConfirmSubmit = (reasonText: string, type: string) => {
    setModalConfig((prev) => ({ ...prev, type: null })); // Close reason handler sheet frame
    if (type === "approve company") {
      approveCompany.mutate({
        id: id!!,
        status: "approved",
      });
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Header section */}
      <div className="mb-4 flex justify-between items-start md:items-center">
        <div>
          <h1 className="text-xl font-medium text-dark">Riders & Logisticss</h1>
          <p className="text-xs text-navgray mt-0.5">
            Manage logistics companies and delivery riders.
          </p>
        </div>

        <button
          className="flex items-center md:gap-1.5 bg-aorange hover:bg-gray-50 text-white px-1 py-1.5 md:px-3 md:py-2.5 rounded-lg text-xs md:text-sm transition"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusIcon className="w-5" />
          <span className="">Onboard partner</span>
        </button>
      </div>
      {openDetails && (
        <button
          className="inline-flex items-center gap-2 text-sm text-navgray hover:text-gray-800 font-medium mb-3 transition-colors cursor-pointer"
          onClick={handleCloseProfile}
        >
          <ArrowLeft size={14} />
          <span>Back to Companies</span>
        </button>
      )}
      {/* Tabs Layout */}
      <div className="flex bg-white p-1 rounded-lg border border-lightborder w-fit mb-5">
        <button
          onClick={() => setActiveTab("companies")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
            activeTab === "companies"
              ? "bg-aorange text-white "
              : "text-navgray hover:text-gray-900"
          }`}
        >
          {openDetails ? "Riders" : "Companies"}
        </button>
        {/* <button
          onClick={() => setActiveTab("riders")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
            activeTab === "riders"
              ? "bg-aorange text-white"
              : "text-navgray hover:text-gray-900"
          }`}
        >
          Riders
        </button> */}
      </div>

      {/* Metrics Row (Conditionally shown or updated based on UI view context) */}
      {!openDetails && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <MetricCard
            title="Total companies"
            value={companySummary?.totalCompaniesCount}
            valueStyle="text-dark text-xl font-bold"
            titleStyle="text-navgray font-sm"
            divStyle=""
          />
          <MetricCard
            title="Approved"
            value={companySummary?.approvedCount}
            valueStyle="text-dark text-xl font-bold"
            titleStyle="text-navgray font-sm"
            divStyle=""
          />
          <MetricCard
            title="Pending"
            value={companySummary?.pendingCount}
            valueStyle="text-dark text-xl font-bold"
            titleStyle="text-navgray font-sm"
            divStyle=""
          />
          <MetricCard
            title="Suspended"
            value={companySummary?.suspendedCount}
            // subTitle="requires attention"
            valueStyle="text-dark text-xl font-bold"
            titleStyle="text-navgray font-sm"
            divStyle=""
          />
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
        <SearchInput
          className="w-full md:w-2/4"
          padd="py-3 px-4"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="flex items-center gap-2 max-w-md flex-wrap">
          {(openDetails
            ? ["all", "available", "inactive", "on_delivery", "unavailable"]
            : (["all", "approved", "pending", "suspended"] as const)
          ).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-full font-medium text-sm transition-all border cursor-pointer capitalize ${
                filter === tab
                  ? "bg-aorange text-white border-aorange"
                  : "hover:text-gray-900 text-navgray bg-white border-lightborder"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Render Main Table Selection */}
      {openDetails ? (
        <DataTable
          columns={riderColumns}
          data={filteredRiders ?? []}
          onActionClick={(id, action) => handleRiders(id, action)}
        />
      ) : (
        <DataTable
          columns={companyColumns}
          data={filteredData ?? []}
          onActionClick={(id, action) => handleAction(id, action)}
        />
      )}

      <RiderProfileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        riderId={selectedRiderId}
        riders={riders?.data?.riders ?? []}
      />

      <CompanyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleOnboardSubmit}
        isSubmitting={isPending}
        apiError={err?.message || null}
      />

      <ActionWithReasonModal
        isOpen={modalConfig.type !== null}
        onClose={() => setModalConfig((prev) => ({ ...prev, type: null }))}
        onConfirm={handleActionConfirmSubmit}
        title={modalConfig.title}
        type={modalConfig.type ?? ""}
        description={modalConfig.description}
        placeholderText={modalConfig?.placeholder ?? ""}
        confirmButtonColor={modalConfig?.color ?? ""}
        confirmLabel={modalConfig.label}
      />
      <Pagination
        currentPage={page}
        totalPages={totalPagesCount}
        onPageChange={setPage}
      />
    </div>
  );
}
