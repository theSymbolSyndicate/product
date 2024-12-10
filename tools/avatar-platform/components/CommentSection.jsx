'use client';

import { timestampToText } from '@/utils/common';
import { Avatar, Button, Input } from '@nextui-org/react';
import React, { useState } from 'react';
import { MdDeleteForever as DeleteIcon } from 'react-icons/md';

export const CommentSection = ({ user, initialComments, fetchComments, postComment, deleteComment }) => {
	const [comments, setComments] = useState(initialComments);
	const [textInput, setTextInput] = useState('');

	const isDeleteButtonShown = comment => comment.createdBy.id === user.id;
	const handlePostComment = async () => {
		await postComment(textInput);
		const updatedComments = await fetchComments();
		setComments(updatedComments);
		setTextInput('');
	};
	const handleDeleteComment = async commentId => {
		await deleteComment(commentId);
		const updatedComments = await fetchComments();
		setComments(updatedComments);
	};

	return (
		<div className="w-full">
			<div className="mb-4 w-full">
				{comments.map((comment, index) => (
					<div key={index} className="mb-4 flex w-full items-start">
						<Avatar src={comment.createdBy.avatar} className="mr-4" />
						<div className="flex-1">
							<div className="flex w-full flex-row justify-between gap-3">
								<div className="flex flex-row gap-3">
									<div className="text-sm font-bold leading-4">{comment.createdBy.name}</div>
									<div className="text-sm leading-4 opacity-70">{timestampToText(comment.createdAt)}</div>
								</div>
								{isDeleteButtonShown(comment) && (
									<button onClick={() => handleDeleteComment(comment.id)}>
										<DeleteIcon />
									</button>
								)}
							</div>
							<div className="text-sm">{comment.text}</div>
						</div>
					</div>
				))}
			</div>
			<div className="flex w-full flex-row gap-4">
				<Input
					size="sm"
					placeholder="Add a comment"
					value={textInput}
					onChange={e => setTextInput(e.target.value)}
				/>
				<Button
					size="sm"
					color="primary"
					onClick={handlePostComment}
				>
                    Send
				</Button>
			</div>
		</div>
	);
};
