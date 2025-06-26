import { Pencil, Trash2 } from "lucide-react";
import type { Vehicle } from "../../types/Vehicle";
import Button from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface ActionButtonsProps {
    vehicle: Vehicle;
    onEdit: (vehicle: Vehicle) => void;
    onDelete: (vehicle: Vehicle) => void;
}

const ActionButtons = ({ vehicle, onEdit, onDelete }: ActionButtonsProps) => (
    <TooltipProvider delayDuration={200} skipDelayDuration={100}>
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="primary" size="icon" onClick={() => onEdit(vehicle)} className="w-full md:w-fit">
                    <Pencil className="w-4 h-4" />
                </Button>
            </TooltipTrigger>
            <TooltipContent>Edit vehicle</TooltipContent>
        </Tooltip>
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="destructive" size="icon" onClick={() => onDelete(vehicle)} className="w-full md:w-fit">
                    <Trash2 className="w-4 h-4" />
                </Button>
            </TooltipTrigger>
            <TooltipContent variant="destructive">Delete vehicle</TooltipContent>
        </Tooltip>
    </TooltipProvider>
);

export default ActionButtons;