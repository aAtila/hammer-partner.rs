import { RotateCwIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '~/lib/utils';

export default function SubmitButton({
	label,
	className,
}: {
	label: string;
	className?: string;
}) {
	return (
		<Button type="submit" className={cn([className, 'flex'])}>
			<RotateCwIcon className="absolute size-6 animate-spin group-enabled:opacity-0" />
			<span className="group-disabled:opacity-0">{label}</span>
		</Button>
	);
}
