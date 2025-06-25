export type ModalType = 'createVehicle' | 'editVehicle' | null;

export interface ModalContextType {
	modalType: ModalType;
	modalProps: Record<string, any>;
	openModal: (type: ModalType, props?: Record<string, any>) => void;
	closeModal: () => void;
}