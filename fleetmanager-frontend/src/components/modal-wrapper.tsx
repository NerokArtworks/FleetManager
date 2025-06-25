import React, {
	useEffect,
	useRef,
	useState,
	type ReactNode,
} from "react";

interface ModalWrapperProps {
	children: ReactNode;
	onClose: () => void;
}

export const ModalWrapper = ({ children, onClose }: ModalWrapperProps) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 10);

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") handleClose();
		};
		document.addEventListener("keydown", onKeyDown);

		return () => {
			clearTimeout(timer);
			document.removeEventListener("keydown", onKeyDown);
		};
	}, []);

	const handleClose = () => {
		setIsVisible(false);
		setTimeout(() => {
			onClose();
		}, 200);
	};

	const onClickBackdrop = (e: React.MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
			handleClose();
		}
	};

	return (
		<div
			onClick={onClickBackdrop}
			className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-200 ${isVisible ? "opacity-100 bg-black/40 dark:bg-black/60" : "opacity-0 bg-black/0"
				}`}
			aria-modal="true"
			role="dialog"
			aria-labelledby="modal-title"
			aria-describedby="modal-description"
		>
			<div
				ref={modalRef}
				className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-6xl w-full relative outline-none transform transition-all duration-200 p-2 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
					}`}
				tabIndex={-1}
			>
				{children}
			</div>
		</div>
	);
};