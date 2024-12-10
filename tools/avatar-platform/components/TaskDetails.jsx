'use client';
import { AssigneeView } from '@/components/AssigneeView';
import { StatusView } from '@/components/StatusView';
import { formFields } from '@/config';
import { timestampToText } from '@/utils/common';
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure
} from '@nextui-org/react';
import { useState } from 'react';
import { RiAttachment2 as AttachmentIcon } from 'react-icons/ri';

export const TaskDetails = ({ isManageable, initialTaskData, userList, fetchTask, changeTaskAssignees, changeTaskStatus }) => {
	const [task, setTask] = useState(initialTaskData);
	const formModalController = useDisclosure();

	const refreshTask = async () => {
		const newTaskData = await fetchTask(task.id);
		setTask(newTaskData);
	};
	const handleAssigneeSelection = async assignees => {
		await changeTaskAssignees(assignees);
		await refreshTask();
	};
	const handleStatusChange = async status => {
		await changeTaskStatus(status);
		await refreshTask();
	};

	return (
		<div className="flex w-full flex-col items-start gap-4">
			<h2 className="text-xl">Task Details</h2>
			<div className="flex w-full flex-col items-start">
				<p className="text-sm capitalize opacity-70">Status</p>
				<StatusView
					isEditable={isManageable}
					status={task.status}
					onChange={handleStatusChange}
				/>
			</div>
			<div className="flex w-full flex-col items-start gap-2">
				<p className="text-sm capitalize opacity-70">Assignees</p>
				<AssigneeView
					isEditable={isManageable}
					assignees={task.assignees}
					userList={userList}
					onChange={handleAssigneeSelection}
				/>
			</div>
			<div className="flex w-full flex-col items-start">
				<p className="text-sm capitalize opacity-70">Created At</p>
				<p className="capitalize">{timestampToText(task.createdAt)}</p>
			</div>
			<div className="flex w-full flex-col items-start">
				<p className="text-sm capitalize opacity-70">Updated At</p>
				<p className="capitalize">{timestampToText(task.updatedAt)}</p>
			</div>
			<Button
				variant="flat"
				startContent={<AttachmentIcon />}
				size="sm"
				onClick={formModalController.onOpen}
			>
                Open Form
			</Button>
			<Modal
				isOpen={formModalController.isOpen}
				onOpenChange={formModalController.onOpenChange}
				hideCloseButton
				shouldBlockScroll
				scrollBehavior="inside"
				placement="center"
				backdrop="blur"
			>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className="flex flex-col gap-1">Form</ModalHeader>
							<ModalBody>
								{formFields.map(field => (
									<div key={field.name} className="flex w-full flex-col items-start">
										<p className="text-sm capitalize opacity-70">{field.name}</p>
										<p className="capitalize">{task.formData[field.name] || '-'}</p>
									</div>
								))}
							</ModalBody>
							<ModalFooter>
								<Button variant="light" onPress={onClose}>
                                    Close
								</Button>
								<Button color="primary" onPress={onClose}>
                                    Download PDF
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
};
