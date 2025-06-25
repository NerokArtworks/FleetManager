import {
    ArrowDownAZ,
    ArrowUpAZ,
    Search as SearchIcon,
} from "lucide-react";
import React from "react";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import Select from "../../components/ui/select";
import type { VehicleStatus } from "../../types/Vehicle";

interface VehiclesFiltersProps {
    search: string;
    setSearch: (value: string) => void;
    statusFilter: VehicleStatus | "";
    setStatusFilter: (value: "Active" | "Inactive" | "Maintenance" | "") => void;
    sortBy: string;
    setSortBy: (value: string) => void;
    sortDesc: boolean;
    setSortDesc: React.Dispatch<React.SetStateAction<boolean>>;
};

const VehiclesFilters = ({
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    sortDesc,
    setSortDesc,
}: VehiclesFiltersProps) => {
    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-4 items-end">
            <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or plate"
                icon={<SearchIcon className="w-4 h-4" />}
            />

            <Select
                label="Status"
                value={statusFilter}
                onChange={(e) =>
                    setStatusFilter(e.target.value as "Active" | "Inactive" | "Maintenance" | "")
                }
            >
                <option value="">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Maintenance">Maintenance</option>
            </Select>

            <Select
                label="Sort by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
            >
                <option value="createdAt">Created Date</option>
                <option value="name">Name</option>
            </Select>

            <Button
                variant="outline"
                onClick={() => setSortDesc((prev) => !prev)}
                className="w-full"
            >
                {sortDesc ? (
                    <ArrowDownAZ className="w-4 h-4 mr-2" />
                ) : (
                    <ArrowUpAZ className="w-4 h-4 mr-2" />
                )}
                {sortDesc ? "Descending" : "Ascending"}
            </Button>
        </div>
    );
};

export default VehiclesFilters;