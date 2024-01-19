import { json, type ActionFunctionArgs } from '@remix-run/node';
import { Input } from '~/components/ui/input';
import { z } from 'zod';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import { useEffect } from 'react';
import SubmitButton from '~/components/form/submit-button';

const schema = z.object({
	email: z.string().min(5, 'Email je obavezan').email('Email nije validan'),
	password: z
		.string()
		.min(1, 'Lozinka je obavezna')
		.min(8, 'Lozinka je prekratka'),
});

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	const validated = schema.safeParse(data);

	if (!validated.success) {
		console.log(validated.error.flatten());

		return json({ errors: validated.error.flatten().fieldErrors } as const);
	}

	const { email, password } = validated.data;

	if (password !== 'worldwideweb') {
		return json({
			errors: { password: ['Lozinka je neispravna'] },
			email: undefined,
		});
	}

	return json({ email, password });
};

const SignInPage = () => {
	const data = useActionData<typeof action>();
	const navigation = useNavigation();
	const isActionSubmission = navigation.state === 'submitting';

	useEffect(() => {
		console.log(navigation.state);
	}, [navigation.state]);

	if (data && 'errors' in data) {
		console.log(data.errors);
	}

	return (
		<section className="prose mx-auto flex h-full max-w-md flex-col items-center justify-center">
			<h1>Prijavi se</h1>
			<p>Unesi svoj e-mail i lozinku ispod da bi se prijavio na sajt.</p>
			<Form className="w-full" method="post" noValidate>
				<fieldset disabled={isActionSubmission} className="group grid gap-3">
					<div>
						<Input
							name="email"
							type="email"
							placeholder="email@hammer-partner.rs"
							required
						/>
						{data &&
						'errors' in data &&
						'email' in data.errors &&
						data.errors.email ? (
							<small className="text-xs font-medium text-destructive">
								{data.errors.email[0]}
							</small>
						) : null}
					</div>
					<Input
						name="password"
						type="password"
						placeholder="********"
						required
					/>
					<small className="text-xs font-medium text-destructive">
						{data &&
						'errors' in data &&
						'password' in data.errors &&
						data.errors.password ? (
							<small className="text-xs font-medium text-destructive">
								{data.errors.password[0]}
							</small>
						) : null}
					</small>
					<SubmitButton label="Prijavi se" />
				</fieldset>
			</Form>
		</section>
	);
};

export default SignInPage;
