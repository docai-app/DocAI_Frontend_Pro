import useAxios from 'axios-hooks';
import Api from '../../apis';
import { useRef } from 'react';
import useAlert from '../../hooks/useAlert';
import ErrorList from '../common/Widget/ErrorList';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Box, Breadcrumbs, Link, Typography, Chip, Card } from '@mui/joy';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';

import Stack from '@mui/joy/Stack';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import Skeleton from '@mui/joy/Skeleton';

const apiSetting = new Api();

function ChangePassword() {
    const [{ data: putData, loading: putLoading, error: putError }, putPassword] = useAxios(
        apiSetting.User.updateMePassword(),
        { manual: true }
    );

    const formRef = useRef<HTMLFormElement>(null);

    const changePasswordFormik = useFormik({
        initialValues: {
            current_password: '',
            password: '',
            password_confirmation: ''
        },
        onSubmit: (data) => {
            putPassword({ data }).then((res) => {
                if (res.data?.success) {
                    // request success
                    setAlert({ title: '更改成功', type: 'success' });
                }
            });
        },
        validate: ({ password, password_confirmation, current_password }) => {
            const errors: any = {};
            if (password_confirmation !== password) {
                errors.password_confirmation = '與新密碼不同';
            }
            return errors;
        },
        validationSchema: object().shape({
            current_password: string().required('必須填寫'),
            password: string().required('必須填寫'),
            password_confirmation: string().required('必須填寫')
        }),
        validateOnChange: false
    });

    const { setAlert } = useAlert();

    return (
        <Card>
            <form ref={formRef} onSubmit={changePasswordFormik.handleSubmit}>
                {!putData?.success && putData?.errors && <ErrorList errors={putData.errors} />}
                <Stack direction="column" spacing={2} sx={{ display: 'flex', my: 1 }}>
                    <FormControl sx={{ flexGrow: 1 }}>
                        <Typography
                            startDecorator={<FormLabel sx={{ mt: 1, mr: 2 }}>原密碼</FormLabel>}
                            color="danger"
                            level="body-xs"
                        >
                            {changePasswordFormik.errors.current_password}
                        </Typography>
                        <Input
                            size="sm"
                            type="password"
                            name="current_password"
                            onChange={changePasswordFormik.handleChange}
                            value={changePasswordFormik.values.current_password}
                        />
                    </FormControl>

                    <FormControl sx={{ flexGrow: 1 }}>
                        <Typography
                            startDecorator={<FormLabel sx={{ mt: 1, mr: 2 }}>新密碼</FormLabel>}
                            color="danger"
                            level="body-xs"
                        >
                            {changePasswordFormik.errors.password}
                        </Typography>
                        <Input
                            size="sm"
                            type="password"
                            name="password"
                            onChange={changePasswordFormik.handleChange}
                            value={changePasswordFormik.values.password}
                        />
                    </FormControl>

                    <FormControl sx={{ flexGrow: 1 }}>
                        <Typography
                            startDecorator={<FormLabel sx={{ mt: 1, mr: 2 }}>確認新密碼</FormLabel>}
                            color="danger"
                            level="body-xs"
                        >
                            {changePasswordFormik.errors.password_confirmation}
                        </Typography>
                        <Input
                            size="sm"
                            type="password"
                            name="password_confirmation"
                            onChange={changePasswordFormik.handleChange}
                            value={changePasswordFormik.values.password_confirmation}
                        />
                    </FormControl>
                    <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                            <Button type="submit" size="sm" variant="solid">
                                變更密碼
                            </Button>
                        </CardActions>
                    </CardOverflow>
                </Stack>
            </form>
        </Card>
    );
}

export default ChangePassword;
