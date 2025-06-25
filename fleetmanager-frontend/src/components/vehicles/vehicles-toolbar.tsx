import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Plus } from "lucide-react";
import React from "react";
import Button from "../../components/ui/button";

type VehiclesToolbarProps = {
    onCreate: () => void;
    onExportCSV: () => void;
    onPrint: () => void;
};

const VehiclesToolbar: React.FC<VehiclesToolbarProps> = ({
    onCreate,
    onExportCSV,
    onPrint,
}) => {
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-50">Fleet Vehicles</h1>

            <div className="flex items-center space-x-4">
                <Button variant="primary" onClick={onCreate} className="flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    New Vehicle
                </Button>

                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <Button
                            variant="outline"
                            className="flex items-center justify-center"
                            aria-label="Actions"
                        >
                            Actions
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content
                            align="end"
                            sideOffset={5}
                            className="z-50 min-w-[160px] rounded-md border border-gray-200 bg-white p-1 shadow-md dark:border-gray-700 dark:bg-gray-800"
                        >
                            <DropdownMenu.Item
                                className="cursor-pointer select-none rounded-md px-3 py-2 text-sm text-gray-700 dark:text-gray-200 outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
                                onSelect={() => onExportCSV()}
                            >
                                Export to CSV
                            </DropdownMenu.Item>

                            <DropdownMenu.Item
                                className="cursor-pointer select-none rounded-md px-3 py-2 text-sm text-gray-700 dark:text-gray-200 outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
                                onSelect={() => onPrint()}
                            >
                                Print
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            </div>
        </div>
    );
};

export default VehiclesToolbar;