import { Box, Card, Typography } from '@mui/joy';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import useAxios from 'axios-hooks';
import { FormEvent, FormEventHandler, useCallback, useRef } from 'react';
import Api from '../../apis';
import { ShowCurrentUser } from '../../app/setting/SettingContainer';
import useAlert from '../../hooks/useAlert';

import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Skeleton from '@mui/joy/Skeleton';
import Stack from '@mui/joy/Stack';

const apiSetting = new Api();

interface ProfileProps {
    currentUserData: ShowCurrentUser | undefined;
    currentUserLoading: boolean;
}
function Profile({ currentUserData, currentUserLoading }: ProfileProps) {
    const { setAlert } = useAlert();
    const formRef = useRef<HTMLFormElement>(null);
    const [{ }, updateMeProfile] = useAxios(apiSetting.User.updateMeProfile(), { manual: true });
    const formSubmit: FormEventHandler = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            if (!formRef.current) return;
            const formData = new FormData(formRef.current);
            const data: any = {};
            formData.forEach((value, key) => (data[key] = value));
            updateMeProfile({
                data,
                ...apiSetting.User.updateMeProfile()
            }).then((res) => {
                if (res.data?.success) {
                    setAlert({ title: '儲存成功', type: 'success' });
                } else setAlert({ title: '儲存失敗', type: 'error' });
            });
        },
        [formRef, currentUserData]
    );
    return (
        <Card>
            <Box>
                <Typography level="title-md">Personal info</Typography>
                <Typography level="body-sm">
                    Customize how your profile information will apper to the networks.
                </Typography>
            </Box>
            <Divider />
            {currentUserLoading ? (
                <CardContent orientation="horizontal">
                    <Skeleton animation="wave" variant="circular" width={48} height={48} />
                    <div>
                        <Skeleton animation="wave" variant="text" sx={{ width: 120 }} />
                        <Skeleton
                            animation="wave"
                            variant="text"
                            level="body-sm"
                            sx={{ width: 200 }}
                        />
                    </div>
                </CardContent>
            ) : (
                <>
                    <form ref={formRef} onSubmit={formSubmit}>
                        <Stack direction="row" spacing={3} sx={{ display: 'flex', my: 1 }}>
                            {/* <Stack direction="column" spacing={1}>
                    <AspectRatio
                        ratio="1"
                        maxHeight={200}
                        sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                            srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                            loading="lazy"
                            alt=""
                        />
                    </AspectRatio>
                    <IconButton
                        aria-label="upload new picture"
                        size="sm"
                        variant="outlined"
                        color="neutral"
                        sx={{
                            bgcolor: 'background.body',
                            position: 'absolute',
                            zIndex: 2,
                            borderRadius: '50%',
                            left: 100,
                            top: 170,
                            boxShadow: 'sm'
                        }}
                    >
                        <EditRoundedIcon />
                    </IconButton>
                </Stack> */}
                            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                <FormControl
                                    sx={{ display: { sm: 'flex-column', md: 'flex-row' } }}
                                >
                                    <FormLabel>用戶暱稱</FormLabel>
                                    <Input
                                        size="sm"
                                        name="nickname"
                                        defaultValue={currentUserData?.user?.nickname || ''}
                                    />
                                </FormControl>
                                <FormControl sx={{ flexGrow: 1 }}>
                                    <FormLabel>電話號碼</FormLabel>
                                    <Input
                                        size="sm"
                                        name="phone"
                                        defaultValue={currentUserData?.user?.phone || ''}
                                    />
                                </FormControl>
                                <FormControl sx={{ flexGrow: 1 }}>
                                    <FormLabel>職位</FormLabel>
                                    <Input
                                        size="sm"
                                        name="position"
                                        defaultValue={currentUserData?.user?.position || ''}
                                    />
                                </FormControl>
                                <FormControl sx={{ flexGrow: 1 }}>
                                    <FormLabel>出生日期</FormLabel>
                                    <Input
                                        type="date"
                                        name="date_of_birth"
                                        defaultValue={
                                            currentUserData?.user?.date_of_birth || ''
                                        }
                                    // slotProps={{
                                    //     input: {
                                    //         min: '2018-06-07',
                                    //         max: '2018-06-14',
                                    //     },
                                    // }}
                                    />
                                </FormControl>
                                <FormControl sx={{ flexGrow: 1 }}>
                                    <FormLabel>性別</FormLabel>
                                    <RadioGroup
                                        defaultValue={
                                            currentUserData?.user?.sex === 1 ? 'male' : 'female'
                                        }
                                        name="sex"
                                        // value={value}
                                        // onChange={handleChange}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: 2,
                                            alignItems: 'center',
                                            mt: -1,
                                            ml: -2
                                        }}
                                    >
                                        <Box />
                                        <Radio value="male" label="男 Male" />
                                        <Radio value="female" label="女 Female" />
                                    </RadioGroup>
                                </FormControl>
                            </Stack>
                        </Stack>

                        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                <Button type="submit" size="sm" variant="solid">
                                    保存
                                </Button>
                            </CardActions>
                        </CardOverflow>
                    </form>
                </>
            )}
        </Card>
    );
}

export default Profile;
