/* eslint-disable jsx-a11y/anchor-is-valid */
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import TableRow from './TableRow';


const drives = {
    "success": true,
    "folders": [
        {
            "id": "9c0550aa-bd9d-45f6-940c-c54951e6ffa5",
            "name": "",
            "parent_id": null,
            "user_id": null,
            "created_at": "2024-04-17T14:57:31.985+08:00",
            "updated_at": "2024-04-17T14:57:31.985+08:00"
        },
        {
            "id": "7c2e56d0-cc97-42e3-b17a-59d09b32dbf3",
            "name": "",
            "parent_id": null,
            "user_id": null,
            "created_at": "2024-04-17T14:57:27.883+08:00",
            "updated_at": "2024-04-17T14:57:27.883+08:00"
        },
        {
            "id": "3f4ba46a-f98a-4fcc-a2fe-19f666b204d3",
            "name": "",
            "parent_id": null,
            "user_id": null,
            "created_at": "2024-04-17T14:57:08.840+08:00",
            "updated_at": "2024-04-17T14:57:08.840+08:00"
        },
        {
            "id": "3aa04acd-e3b6-4d86-a0aa-9c1c13458885",
            "name": "",
            "parent_id": null,
            "user_id": null,
            "created_at": "2024-04-17T14:57:07.474+08:00",
            "updated_at": "2024-04-17T14:57:07.474+08:00"
        },
        {
            "id": "015bb523-6725-4a11-85fd-d57d4c469a86",
            "name": "scRNA-seq Analyst QA",
            "parent_id": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "created_at": "2024-04-17T14:18:29.709+08:00",
            "updated_at": "2024-04-17T14:18:29.709+08:00",
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            }
        },
        {
            "id": "a7992f53-91f2-4630-a029-93119ec731b0",
            "name": "US_DOC07_20240318",
            "parent_id": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "created_at": "2024-03-18T22:32:45.039+08:00",
            "updated_at": "2024-03-18T22:32:45.039+08:00",
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            }
        },
        {
            "id": "480f2b9b-5778-4203-9a0f-956d63b2a676",
            "name": "Usertesting_UK_DOC4-5_20230313",
            "parent_id": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "created_at": "2024-03-13T16:47:20.722+08:00",
            "updated_at": "2024-03-13T16:47:20.722+08:00",
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            }
        },
        {
            "id": "3e702858-6cc8-4291-a65c-ff38ea6e6663",
            "name": "黎巴嫩_DOC13_20240313",
            "parent_id": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "created_at": "2024-03-13T16:18:07.123+08:00",
            "updated_at": "2024-03-13T16:18:07.123+08:00",
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            }
        },
        {
            "id": "379f43ce-cb91-4da1-a220-8cbead2791dd",
            "name": "阿聯莤_DOC14_20240313",
            "parent_id": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "created_at": "2024-03-13T16:17:44.182+08:00",
            "updated_at": "2024-03-13T16:17:44.182+08:00",
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            }
        },
        {
            "id": "e9a4dacc-9a5e-4368-8096-8830f122890b",
            "name": "沙特_DOC16_20240313",
            "parent_id": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "created_at": "2024-03-13T16:17:23.518+08:00",
            "updated_at": "2024-03-13T16:17:23.518+08:00",
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            }
        },
        {
            "id": "67512f09-b193-4ba8-8c75-cba7f724d03a",
            "name": "卡塔爾_DOC15_20240313",
            "parent_id": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "created_at": "2024-03-13T16:17:00.820+08:00",
            "updated_at": "2024-03-13T16:17:00.820+08:00",
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            }
        },
        {
            "id": "67e4a71b-88c2-4de1-a7fb-281ee349397b",
            "name": "以色列_DOC11-12_20240313",
            "parent_id": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "created_at": "2024-03-13T16:16:16.191+08:00",
            "updated_at": "2024-03-13T16:16:16.191+08:00",
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            }
        },
        {
            "id": "78deb1ea-fb3f-4d4e-b5c8-110eda63163f",
            "name": "HK_DOC8-9_20240313",
            "parent_id": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "created_at": "2024-03-13T16:07:21.249+08:00",
            "updated_at": "2024-03-13T16:07:21.249+08:00",
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            }
        },
        {
            "id": "6fdefb8c-4cbb-4057-9032-e6f99f3e29d3",
            "name": "UK_DOC1-6_20240313",
            "parent_id": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "created_at": "2024-03-13T16:02:11.764+08:00",
            "updated_at": "2024-03-13T16:02:11.764+08:00",
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            }
        },
        {
            "id": "069ac29b-7cb5-4114-acd0-04015656fe97",
            "name": "HKU_interview",
            "parent_id": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "created_at": "2024-03-10T17:19:45.751+08:00",
            "updated_at": "2024-03-10T17:19:45.751+08:00",
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            }
        },
        {
            "id": "c9adf506-e3a8-4bcb-8f80-d3d8ce2663ba",
            "name": "HKU Faculty of Dentistry",
            "parent_id": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "created_at": "2024-03-08T23:13:09.052+08:00",
            "updated_at": "2024-03-08T23:13:09.052+08:00",
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            }
        },
        {
            "id": "a0783633-86a8-4420-971b-401042b506d4",
            "name": "HKU Admission",
            "parent_id": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "created_at": "2024-03-08T16:06:10.982+08:00",
            "updated_at": "2024-03-08T16:06:10.982+08:00",
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            }
        },
        {
            "id": "9a75daa1-b0ed-4583-a0ae-e6b1924761f6",
            "name": "中東升學_2024030",
            "parent_id": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "created_at": "2024-03-04T15:56:31.070+08:00",
            "updated_at": "2024-03-04T15:56:31.070+08:00",
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            }
        },
        {
            "id": "60ea7cce-142f-41be-8382-5ec3c88212c0",
            "name": "Project Management Tools",
            "parent_id": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "created_at": "2024-02-29T16:45:31.508+08:00",
            "updated_at": "2024-02-29T16:45:31.508+08:00",
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            }
        },
        {
            "id": "570d2cef-cc5d-4028-907c-5f6aee741d89",
            "name": "Mock_Emails_for_demo_FAS_20240111",
            "parent_id": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "created_at": "2024-01-11T07:23:02.454+08:00",
            "updated_at": "2024-01-11T07:23:02.454+08:00",
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            }
        },
        {
            "id": "e24f68a1-19b7-418c-8e37-0987b224d1fe",
            "name": "Customer Service Learning PDF",
            "parent_id": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "created_at": "2024-01-10T16:17:42.172+08:00",
            "updated_at": "2024-01-10T16:17:42.172+08:00",
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            }
        },
        {
            "id": "6376c49a-7f03-43c9-a1bb-0e9317e9d457",
            "name": "TBDC_SUV_Program_BHive",
            "parent_id": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "created_at": "2023-11-20T20:45:00.471+08:00",
            "updated_at": "2023-11-20T20:45:00.471+08:00",
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            }
        },
        {
            "id": "a73cc684-e386-4bf4-902d-b78c1fca933c",
            "name": "Test杏仁餅表",
            "parent_id": null,
            "user_id": null,
            "created_at": "2023-11-07T11:33:59.625+08:00",
            "updated_at": "2023-11-07T11:33:59.625+08:00"
        },
        {
            "id": "968dcabf-65cf-4bba-8353-8a755a9316fc",
            "name": "大文件",
            "parent_id": null,
            "user_id": null,
            "created_at": "2023-11-06T17:51:47.385+08:00",
            "updated_at": "2023-11-06T17:51:47.385+08:00"
        },
        {
            "id": "14c48711-99da-4a94-a680-84f177e73ee2",
            "name": "CHYB生產",
            "parent_id": null,
            "user_id": null,
            "created_at": "2023-11-03T11:41:07.441+08:00",
            "updated_at": "2023-11-03T11:41:07.441+08:00"
        },
        {
            "id": "1efbbec9-cb87-4b51-b32a-f4a570fb85b7",
            "name": "CHYB生產單",
            "parent_id": null,
            "user_id": null,
            "created_at": "2023-11-03T11:01:13.508+08:00",
            "updated_at": "2023-11-03T11:01:13.508+08:00"
        },
        {
            "id": "af868969-b017-43fc-aa26-6eaf36c2d903",
            "name": "生產單",
            "parent_id": null,
            "user_id": null,
            "created_at": "2023-11-03T10:54:08.967+08:00",
            "updated_at": "2023-11-03T10:54:08.967+08:00"
        },
        {
            "id": "5290ca49-18b6-4e57-accd-67dc59997521",
            "name": "DOCAI-CV",
            "parent_id": null,
            "user_id": null,
            "created_at": "2023-11-02T17:54:11.315+08:00",
            "updated_at": "2023-11-02T17:54:11.315+08:00"
        },
        {
            "id": "6f1ff349-55eb-435a-bc29-dd1a8e7e0583",
            "name": "Spec Checking",
            "parent_id": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "created_at": "2023-11-01T18:08:36.233+08:00",
            "updated_at": "2023-11-01T18:08:36.233+08:00",
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            }
        },
        {
            "id": "7ff17c6b-3938-43ca-bbb8-f22dfae1cad0",
            "name": "Republic of Congo Introduction",
            "parent_id": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "created_at": "2023-11-01T13:29:59.787+08:00",
            "updated_at": "2023-11-01T13:29:59.787+08:00",
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            }
        },
        {
            "id": "c3a8e165-f715-442f-934c-677818f8f398",
            "name": "2023-10訂單",
            "parent_id": null,
            "user_id": null,
            "created_at": "2023-10-30T16:44:38.596+08:00",
            "updated_at": "2023-10-30T16:44:38.596+08:00"
        },
        {
            "id": "ab88703b-beac-4009-93d5-a398e80078a3",
            "name": "Website",
            "parent_id": null,
            "user_id": null,
            "created_at": "2023-10-30T15:46:29.215+08:00",
            "updated_at": "2023-10-30T15:46:29.215+08:00"
        },
        {
            "id": "0cadbf80-8669-4c68-810e-8610815aca5b",
            "name": "Toronto Business Development Centre",
            "parent_id": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "created_at": "2023-10-30T15:44:27.512+08:00",
            "updated_at": "2023-10-30T15:44:27.512+08:00",
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            }
        },
        {
            "id": "260fb10d-15e3-42e0-9ede-4a24d5e32427",
            "name": "打印機說明書",
            "parent_id": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "created_at": "2023-10-26T00:14:30.654+08:00",
            "updated_at": "2023-10-26T00:14:30.654+08:00",
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            }
        },
        {
            "id": "1ba5f910-b87a-42d5-89f3-80321b40c49d",
            "name": "测试标签",
            "parent_id": null,
            "user_id": null,
            "created_at": "2023-10-16T15:00:15.386+08:00",
            "updated_at": "2023-10-16T15:00:15.386+08:00"
        },
        {
            "id": "9d53d238-f39f-44af-af3c-0ca13f2b978d",
            "name": "花生糖部_生產文件",
            "parent_id": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "created_at": "2023-10-16T14:50:19.296+08:00",
            "updated_at": "2023-10-16T16:50:45.664+08:00",
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            }
        },
        {
            "id": "8f347c67-9269-4f3e-b658-31c863ac1fa1",
            "name": "请假22",
            "parent_id": null,
            "user_id": null,
            "created_at": "2023-10-16T14:46:56.822+08:00",
            "updated_at": "2023-10-16T14:46:56.822+08:00"
        },
        {
            "id": "033942ee-bd59-4fe4-85bb-38d7a9304b10",
            "name": "请假2",
            "parent_id": null,
            "user_id": null,
            "created_at": "2023-10-16T14:15:16.740+08:00",
            "updated_at": "2023-10-16T14:15:16.740+08:00"
        },
        {
            "id": "62843436-5328-4f5e-b90b-b3bb63b43bc3",
            "name": "Business Card",
            "parent_id": null,
            "user_id": null,
            "created_at": "2023-10-15T14:46:15.255+08:00",
            "updated_at": "2023-10-15T14:46:15.255+08:00"
        },
        {
            "id": "8507461b-84e7-4f2c-994a-66280fd611d5",
            "name": "Business Card (Expand North Star 2023)",
            "parent_id": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "created_at": "2023-10-15T13:50:05.258+08:00",
            "updated_at": "2023-10-15T13:50:05.258+08:00",
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            }
        }
    ],
    "documents": [
        {
            "id": "5bb875c8-ace7-4bac-92c7-768aaad35ce4",
            "name": "提取內容_20230103.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/f940b88a-263e-4fcc-b4ef-4c843f0939f0_提取內容_20230103.pdf",
            "status": "confirmed",
            "created_at": "2023-05-15T23:03:56.125+08:00",
            "updated_at": "2024-03-14T00:17:40.696+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": null,
            "is_classified": true,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": null,
            "retry_count": 0,
            "labels": [
                {
                    "id": "aa1448a8-d2bf-41da-bca8-b3fd3e6b7bad",
                    "name": "維修單"
                }
            ]
        },
        {
            "id": "53dc9fd5-cca5-46f6-ad32-dedcafba4f94",
            "name": "報損表_20230410.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/fa03e79a-da8a-4c9d-a653-3636457bb0b0_報損表_20230410.pdf",
            "status": "confirmed",
            "created_at": "2023-05-16T21:22:09.677+08:00",
            "updated_at": "2024-03-14T00:16:27.386+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "is_classified": true,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": null,
            "retry_count": 0,
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            },
            "labels": [
                {
                    "id": "32b5fb79-9105-45f0-9da0-e9f33c5b742a",
                    "name": "一願咖啡報損表"
                }
            ]
        },
        {
            "id": "dc58c1ac-2178-4475-9fc4-6182edd4cfe1",
            "name": "報損表_20230503.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/ef879567-24b9-40a4-a0e2-a3e4ec66875b_報損表_20230503.pdf",
            "status": "confirmed",
            "created_at": "2023-05-16T21:23:46.587+08:00",
            "updated_at": "2024-03-14T00:15:40.342+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "is_classified": true,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": null,
            "retry_count": 0,
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            },
            "labels": [
                {
                    "id": "32b5fb79-9105-45f0-9da0-e9f33c5b742a",
                    "name": "一願咖啡報損表"
                }
            ]
        },
        {
            "id": "c08f0644-8eb4-4502-9413-ae9929bdeb1e",
            "name": "一願咖啡報損表_2023_05_15",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/e03ef4f4-445e-4be9-85f0-fcebcb0c7d80_一願咖啡報損表_2023_05_15",
            "status": "confirmed",
            "created_at": "2023-05-17T08:39:42.255+08:00",
            "updated_at": "2024-03-14T00:15:30.001+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "is_classified": true,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": null,
            "retry_count": 0,
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            },
            "labels": [
                {
                    "id": "32b5fb79-9105-45f0-9da0-e9f33c5b742a",
                    "name": "一願咖啡報損表"
                }
            ]
        },
        {
            "id": "6f8c5fe2-f52d-44cf-a222-f54fed6e7cf4",
            "name": "會議記錄模版_20221001_Final.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/c426bafb-ccb7-457c-8d34-0afb410a5072_會議記錄模版_20221001_final.pdf",
            "status": "confirmed",
            "created_at": "2023-07-29T17:53:07.780+08:00",
            "updated_at": "2024-03-13T23:03:40.342+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "is_classified": true,
            "is_document": true,
            "meta": {
                "is_approved": true,
                "form_schema_id": "359c7cf2-b597-458c-aca4-f7c346a074bd",
                "needs_approval": true,
                "is_deep_understanding": true,
                "needs_deep_understanding": true
            },
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": null,
            "retry_count": 0,
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            },
            "labels": [
                {
                    "id": "be233f85-c0ef-418e-b752-761b7452b175",
                    "name": "會議記錄"
                }
            ]
        },
        {
            "id": "66ef2003-3a2e-4acd-8866-c92b526c0efb",
            "name": "會議記錄模版_20221002_Final.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/76396870-d25c-412a-9022-c78fe8cd0497_會議記錄模版_20221002_final.pdf",
            "status": "confirmed",
            "created_at": "2023-07-29T17:53:10.539+08:00",
            "updated_at": "2024-03-13T23:03:29.432+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "is_classified": true,
            "is_document": true,
            "meta": {
                "is_approved": true,
                "form_schema_id": "359c7cf2-b597-458c-aca4-f7c346a074bd",
                "needs_approval": true,
                "is_deep_understanding": true,
                "needs_deep_understanding": true
            },
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": null,
            "retry_count": 0,
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            },
            "labels": [
                {
                    "id": "be233f85-c0ef-418e-b752-761b7452b175",
                    "name": "會議記錄"
                }
            ]
        },
        {
            "id": "54989a10-6921-416b-8d3b-03558c809bda",
            "name": "會議記錄模版_20221003_Final.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/fec3cc0a-59c2-43fa-ace3-8f9921b249f8_會議記錄模版_20221003_final.pdf",
            "status": "confirmed",
            "created_at": "2023-07-29T17:53:12.878+08:00",
            "updated_at": "2024-03-13T23:00:40.146+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "is_classified": true,
            "is_document": true,
            "meta": {
                "is_approved": true,
                "form_schema_id": "359c7cf2-b597-458c-aca4-f7c346a074bd",
                "needs_approval": true,
                "is_deep_understanding": true,
                "needs_deep_understanding": true
            },
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": null,
            "retry_count": 0,
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            },
            "labels": [
                {
                    "id": "be233f85-c0ef-418e-b752-761b7452b175",
                    "name": "會議記錄"
                }
            ]
        },
        {
            "id": "e80a7ba0-02b9-46ad-bfc3-f652ef21e145",
            "name": "會議記錄模版_20221004_Final.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/6c3aa741-0c0e-49bb-8f83-59bf9b0148e1_會議記錄模版_20221004_final.pdf",
            "status": "confirmed",
            "created_at": "2023-07-29T17:53:15.082+08:00",
            "updated_at": "2024-03-13T23:00:27.367+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "is_classified": true,
            "is_document": true,
            "meta": {
                "is_approved": true,
                "form_schema_id": "359c7cf2-b597-458c-aca4-f7c346a074bd",
                "needs_approval": true,
                "is_deep_understanding": true,
                "needs_deep_understanding": true
            },
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": null,
            "retry_count": 0,
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            },
            "labels": [
                {
                    "id": "be233f85-c0ef-418e-b752-761b7452b175",
                    "name": "會議記錄"
                }
            ]
        },
        {
            "id": "e948f3dd-cc76-49e8-b903-5832a15c1afe",
            "name": "會議記錄模版_20221005_Final.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/bdd60232-27c5-495a-9adb-9fd745747432_會議記錄模版_20221005_final.pdf",
            "status": "confirmed",
            "created_at": "2023-07-29T17:53:17.297+08:00",
            "updated_at": "2024-03-13T22:59:29.307+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "is_classified": true,
            "is_document": true,
            "meta": {
                "is_approved": true,
                "form_schema_id": "359c7cf2-b597-458c-aca4-f7c346a074bd",
                "needs_approval": true,
                "is_deep_understanding": true,
                "needs_deep_understanding": true
            },
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": null,
            "retry_count": 0,
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            },
            "labels": [
                {
                    "id": "be233f85-c0ef-418e-b752-761b7452b175",
                    "name": "會議記錄"
                }
            ]
        },
        {
            "id": "a58daa12-e963-4dc6-9487-5997f4a07fa6",
            "name": "ACT0001_蘇夏秋.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/d7800a6f-6390-4bae-9ee4-aad30e5aeee3_act0001_蘇夏秋.pdf",
            "status": "confirmed",
            "created_at": "2023-09-27T13:02:44.498+08:00",
            "updated_at": "2024-03-13T22:21:31.766+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "is_classified": true,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": null,
            "retry_count": 0,
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            },
            "labels": [
                {
                    "id": "d26c0813-4e17-4ab3-8e38-055cee127b99",
                    "name": "CV"
                }
            ]
        },
        {
            "id": "1f66ee2f-6435-4ddb-8457-f1c430b361ff",
            "name": "DocAI - Roy Ho.jpg",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/068ca2e7-b457-4061-897a-cf14bdcadcb7_docai - roy ho.jpg",
            "status": "confirmed",
            "created_at": "2023-10-15T15:12:26.430+08:00",
            "updated_at": "2024-03-13T22:05:29.556+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "is_classified": true,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": null,
            "retry_count": 0,
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            },
            "labels": [
                {
                    "id": "3c8a3e82-b6d8-4a07-bbdc-ad1c9f0c6751",
                    "name": "Business Card"
                }
            ]
        },
        {
            "id": "be88691a-aee8-4e88-a114-aadc2785be86",
            "name": "DocAI - Roy Ho.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/d6e77a24-8e78-4cc9-a658-07a56b8ed5a5_docai - roy ho.pdf",
            "status": "confirmed",
            "created_at": "2023-10-15T15:12:29.220+08:00",
            "updated_at": "2024-03-13T22:04:43.000+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "is_classified": true,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": null,
            "retry_count": 0,
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            },
            "labels": [
                {
                    "id": "3c8a3e82-b6d8-4a07-bbdc-ad1c9f0c6751",
                    "name": "Business Card"
                }
            ]
        },
        {
            "id": "1a7ab76f-7659-44f9-8dd0-764f531f1586",
            "name": "请假纸.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/1db77033-c2a7-4297-a73a-13548c105dcb_请假纸.pdf",
            "status": "confirmed",
            "created_at": "2023-10-16T18:43:04.642+08:00",
            "updated_at": "2024-03-13T21:58:27.164+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "is_classified": true,
            "is_document": true,
            "meta": {
                "is_approved": true,
                "form_schema_id": "162e2131-ce6e-48d9-9e07-bbb1efe29651",
                "needs_approval": "true",
                "is_deep_understanding": true,
                "needs_deep_understanding": "true"
            },
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": null,
            "retry_count": 0,
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            },
            "labels": [
                {
                    "id": "056b73e5-26cb-431e-8a42-fd77a8c1c511",
                    "name": "CHYB請假表"
                }
            ]
        },
        {
            "id": "86ee432c-8aed-449d-8402-dbcd06d97c9b",
            "name": "请假纸.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/0f8d1e65-c4d7-4f60-ac03-2d97cf26aa33_请假纸.pdf",
            "status": "confirmed",
            "created_at": "2023-10-16T18:58:14.796+08:00",
            "updated_at": "2024-03-13T21:55:41.390+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "is_classified": true,
            "is_document": true,
            "meta": {
                "is_approved": true,
                "form_schema_id": "162e2131-ce6e-48d9-9e07-bbb1efe29651",
                "needs_approval": "true",
                "is_deep_understanding": true,
                "needs_deep_understanding": "true"
            },
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": null,
            "retry_count": 0,
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            },
            "labels": [
                {
                    "id": "056b73e5-26cb-431e-8a42-fd77a8c1c511",
                    "name": "CHYB請假表"
                }
            ]
        },
        {
            "id": "fa3b2dc3-7cb0-4cea-8350-e84763f98b8d",
            "name": "请假纸2.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/c04abe87-a20f-47d4-a08d-547989607348_请假纸2.pdf",
            "status": "confirmed",
            "created_at": "2023-10-16T19:00:09.679+08:00",
            "updated_at": "2024-03-13T21:54:26.977+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "is_classified": true,
            "is_document": true,
            "meta": {
                "is_approved": true,
                "form_schema_id": "162e2131-ce6e-48d9-9e07-bbb1efe29651",
                "needs_approval": "true",
                "is_deep_understanding": true,
                "needs_deep_understanding": "true"
            },
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": null,
            "retry_count": 0,
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            },
            "labels": [
                {
                    "id": "056b73e5-26cb-431e-8a42-fd77a8c1c511",
                    "name": "CHYB請假表"
                }
            ]
        },
        {
            "id": "300e8056-96f6-468d-b00b-7f61e3525605",
            "name": "请假纸2.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/911f762c-e52a-4946-98f4-173edd8e8c30_请假纸2.pdf",
            "status": "confirmed",
            "created_at": "2023-10-16T20:28:29.613+08:00",
            "updated_at": "2024-03-13T21:53:40.733+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "is_classified": true,
            "is_document": true,
            "meta": {
                "is_approved": true,
                "form_schema_id": "162e2131-ce6e-48d9-9e07-bbb1efe29651",
                "needs_approval": "true",
                "is_deep_understanding": true,
                "needs_deep_understanding": "true"
            },
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": null,
            "retry_count": 0,
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            },
            "labels": [
                {
                    "id": "056b73e5-26cb-431e-8a42-fd77a8c1c511",
                    "name": "CHYB請假表"
                }
            ]
        },
        {
            "id": "955d396c-bc51-484c-8244-c19ac5b00838",
            "name": "selphycp910-pug2-zh.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/1734a19b-7475-495a-9d15-559ce4857d6b_selphycp910-pug2-zh.pdf",
            "status": "confirmed",
            "created_at": "2023-10-26T01:17:55.565+08:00",
            "updated_at": "2024-03-13T21:43:29.969+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "is_classified": true,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": null,
            "retry_count": 0,
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            },
            "labels": [
                {
                    "id": "a8111169-7319-4fe0-b736-6b575704356a",
                    "name": "TEST生產單"
                }
            ]
        },
        {
            "id": "227562ae-527a-481a-b098-0ba8886b0084",
            "name": "aa87022e-8038-41e2-9219-cf61e2e29943_kazuki yamamoto.jpg",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/84adf066-fc30-4198-aeea-be33d1180f09_aa87022e-8038-41e2-9219-cf61e2e29943_kazuki yamamoto.jpg",
            "status": "confirmed",
            "created_at": "2024-01-10T18:54:57.672+08:00",
            "updated_at": "2024-03-13T20:40:25.878+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": null,
            "is_classified": true,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": null,
            "retry_count": 0,
            "labels": []
        },
        {
            "id": "e1cd8718-9755-4551-a6a9-9d808ae124b1",
            "name": "aa87022e-8038-41e2-9219-cf61e2e29943_kazuki yamamoto.jpg",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/55c1ba94-d13f-4987-9c9d-1170c684e056_aa87022e-8038-41e2-9219-cf61e2e29943_kazuki yamamoto.jpg",
            "status": "confirmed",
            "created_at": "2024-01-11T15:56:42.873+08:00",
            "updated_at": "2024-03-13T20:39:29.261+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": null,
            "is_classified": true,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": null,
            "retry_count": 0,
            "labels": [
                {
                    "id": "3c8a3e82-b6d8-4a07-bbdc-ad1c9f0c6751",
                    "name": "Business Card"
                }
            ]
        },
        {
            "id": "00bd2dab-0e4f-4267-ae26-d75b98c63953",
            "name": "M1_20221026.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/b57c40b0-8f77-4942-b869-53f3d5898b81_pic_3093.pdf",
            "status": "confirmed",
            "created_at": "2022-10-26T11:03:56.540+08:00",
            "updated_at": "2024-03-05T16:16:07.551+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "is_classified": false,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": null,
            "retry_count": 0,
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            },
            "labels": [
                {
                    "id": "34be014f-f30d-43a3-a37b-df7d0f957a1f",
                    "name": "M1"
                }
            ]
        },
        {
            "id": "02a2528b-8e70-4e6d-8829-26c17e5d7866",
            "name": "315.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/ba00cd70-6925-4317-9eb7-e6eb16ae8a1d_315.pdf",
            "status": "confirmed",
            "created_at": "2023-01-08T23:15:32.748+08:00",
            "updated_at": "2024-03-05T16:15:07.671+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
            "is_classified": false,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": "Timed out reading data from server",
            "retry_count": 1,
            "user": {
                "id": "1665947b-a056-4bff-bdcf-34ecfa2667b9",
                "email": "admin@chyb-dev.com",
                "nickname": "admin"
            },
            "labels": [
                {
                    "id": "d26c0813-4e17-4ab3-8e38-055cee127b99",
                    "name": "CV"
                }
            ]
        },
        {
            "id": "a4df8e2f-0448-4abb-b447-436f046f4805",
            "name": "附件一_certificate of EEC_伊斯蘭脫維善紀念中學Islamic Kasim Tuet Memorial College.jpeg",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/4b0fedab-1f9f-42fe-8c32-2f1de3056422_附件一_certificate of eec_伊斯蘭脫維善紀念中學islamic kasim tuet memorial college.jpeg",
            "status": "confirmed",
            "created_at": "2022-08-14T02:08:02.462+08:00",
            "updated_at": "2023-12-18T19:25:08.122+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": null,
            "is_classified": true,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": null,
            "retry_count": 0,
            "labels": [
                {
                    "id": "2c6460be-7e2a-48a4-a5ab-5724b57184be",
                    "name": "好時光證書"
                }
            ]
        },
        {
            "id": "067d428a-9351-45fb-92b1-4fbf8b1d2d39",
            "name": "附件一_certificate of EEC_佛教大雄中學Buddhist Tai Hung College.jpeg",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/a1f55963-3537-4112-bc59-2dd5299a87fa_附件一_certificate of eec_佛教大雄中學buddhist tai hung college.jpeg",
            "status": "confirmed",
            "created_at": "2022-08-14T02:08:13.778+08:00",
            "updated_at": "2023-12-18T19:24:14.613+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": null,
            "is_classified": true,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": null,
            "retry_count": 0,
            "labels": [
                {
                    "id": "2c6460be-7e2a-48a4-a5ab-5724b57184be",
                    "name": "好時光證書"
                }
            ]
        },
        {
            "id": "5081ed34-3af7-4d69-94de-674e58a6f1d6",
            "name": "New Absent Form_All-10.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/f32419ed-caf2-4557-bc5a-2fdb21a8033f_new absent form_all-10.pdf",
            "status": "confirmed",
            "created_at": "2022-08-14T11:52:35.519+08:00",
            "updated_at": "2023-12-18T19:23:21.048+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": null,
            "is_classified": true,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": null,
            "retry_count": 0,
            "labels": [
                {
                    "id": "056b73e5-26cb-431e-8a42-fd77a8c1c511",
                    "name": "CHYB請假表"
                }
            ]
        },
        {
            "id": "4a37e906-b556-4c37-b0d9-48df5e11192a",
            "name": "20220618111108227.jpg",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/de0bf284-ceaa-4baf-beef-e89ddf1f27ad_20220618111108227.jpg",
            "status": "confirmed",
            "created_at": "2022-08-21T16:29:16.628+08:00",
            "updated_at": "2023-12-18T19:22:08.776+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": null,
            "is_classified": true,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": null,
            "retry_count": 0,
            "labels": [
                {
                    "id": "056b73e5-26cb-431e-8a42-fd77a8c1c511",
                    "name": "CHYB請假表"
                }
            ]
        },
        {
            "id": "64c80537-1e9d-48ec-8eaa-6a72f7f921d7",
            "name": "4b0fedab-1f9f-42fe-8c32-2f1de3056422_附件一_certificate of eec_伊斯蘭脫維善紀念中學islamic kasim tuet memorial college.jpeg",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/99fb57d2-a0bb-4751-8890-f39649ef7b22_4b0fedab-1f9f-42fe-8c32-2f1de3056422_附件一_certificate of eec_伊斯蘭脫維善紀念中學islamic kasim tuet memorial college.jpeg",
            "status": "confirmed",
            "created_at": "2022-08-27T15:28:05.674+08:00",
            "updated_at": "2023-12-18T19:21:21.955+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": null,
            "is_classified": true,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": "Failed to open TCP connection to 20.222.35.101:8889 (Connection refused - connect(2) for 20.222.35.101:8889)",
            "retry_count": 1,
            "labels": [
                {
                    "id": "2c6460be-7e2a-48a4-a5ab-5724b57184be",
                    "name": "好時光證書"
                }
            ]
        },
        {
            "id": "20b4c69b-6d55-425f-adab-4c55cc5fc7be",
            "name": "CHYB_月餅促銷_20220901.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/a9240701-63b8-4b13-aecc-287d6b1d5aeb_chyb_月餅促銷_20220901.pdf",
            "status": "confirmed",
            "created_at": "2022-09-03T13:05:24.262+08:00",
            "updated_at": "2023-12-18T19:20:09.120+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": null,
            "is_classified": true,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": "Failed to open TCP connection to 20.222.35.101:8889 (Connection refused - connect(2) for 20.222.35.101:8889)",
            "retry_count": 1,
            "labels": [
                {
                    "id": "3826aa4f-5b9e-4272-94a5-cbdcd07b8ac3",
                    "name": "促銷計劃書"
                }
            ]
        },
        {
            "id": "8d5838b7-05bd-45c9-b491-74bb26692699",
            "name": "CHYB_月餅促銷_20220901.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/12113df8-9313-4114-bf8d-2fa62f8cea9c_chyb_月餅促銷_20220901.pdf",
            "status": "confirmed",
            "created_at": "2022-09-03T14:54:21.875+08:00",
            "updated_at": "2023-12-18T19:19:18.364+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": null,
            "is_classified": true,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": null,
            "retry_count": 0,
            "labels": [
                {
                    "id": "3826aa4f-5b9e-4272-94a5-cbdcd07b8ac3",
                    "name": "促銷計劃書"
                }
            ]
        },
        {
            "id": "a8b201bd-d752-4455-bf4c-26cc22bc944b",
            "name": "CHYB_月餅促銷_20220901.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/f8fa7552-40de-4154-baae-e793fbb4645d_chyb_月餅促銷_20220901.pdf",
            "status": "confirmed",
            "created_at": "2022-09-03T15:15:48.629+08:00",
            "updated_at": "2023-12-18T19:18:14.806+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": null,
            "is_classified": true,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": "Failed to open TCP connection to 20.222.35.101:8889 (Connection refused - connect(2) for 20.222.35.101:8889)",
            "retry_count": 2,
            "labels": [
                {
                    "id": "70f297d3-1801-4c55-9f83-a87e0da70979",
                    "name": "abc"
                }
            ]
        },
        {
            "id": "33bc9d3e-8996-4ec6-9c58-f3047cb5dec9",
            "name": "92.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/f5cd1cfd-fd2c-42df-a0a5-7ab1a4ae86bb_92.pdf",
            "status": "confirmed",
            "created_at": "2022-09-04T03:29:20.106+08:00",
            "updated_at": "2023-12-18T19:18:08.685+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": null,
            "is_classified": true,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": "Failed to open TCP connection to 20.222.35.101:8889 (Connection refused - connect(2) for 20.222.35.101:8889)",
            "retry_count": 1,
            "labels": [
                {
                    "id": "07ef9a36-24c6-4de7-9de2-0cde5c4aef68",
                    "name": "test4"
                }
            ]
        },
        {
            "id": "9d433855-35cd-4faa-a88b-f5ec6fb64221",
            "name": "Pic_0002-4.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/bde37875-0f52-4328-9bf8-75bc850e2521_pic_0002-4.pdf",
            "status": "confirmed",
            "created_at": "2022-09-06T22:43:54.920+08:00",
            "updated_at": "2023-12-18T18:59:17.322+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": null,
            "is_classified": true,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": null,
            "retry_count": 0,
            "labels": [
                {
                    "id": "f5f60326-8d0c-4adc-a6ce-d030bc395b1f",
                    "name": "专库"
                }
            ]
        },
        {
            "id": "ca34fe59-215a-4dd5-b66d-97c32a9c4ed0",
            "name": "Pic_0002-3.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/b1cd9040-2484-4cd5-b108-3dddc8718c45_pic_0002-3.pdf",
            "status": "confirmed",
            "created_at": "2022-09-06T22:56:03.018+08:00",
            "updated_at": "2023-12-18T18:59:13.282+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": null,
            "is_classified": true,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": null,
            "retry_count": 0,
            "labels": [
                {
                    "id": "056b73e5-26cb-431e-8a42-fd77a8c1c511",
                    "name": "CHYB請假表"
                }
            ]
        },
        {
            "id": "843d81d5-fa34-448e-80db-880775bca68c",
            "name": "Pic_0002-4.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/61f97040-18b8-4455-b2a5-f252ef9926d8_pic_0002-4.pdf",
            "status": "confirmed",
            "created_at": "2022-09-06T22:56:05.171+08:00",
            "updated_at": "2023-12-18T18:58:15.279+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": null,
            "is_classified": true,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": null,
            "retry_count": 0,
            "labels": [
                {
                    "id": "056b73e5-26cb-431e-8a42-fd77a8c1c511",
                    "name": "CHYB請假表"
                }
            ]
        },
        {
            "id": "3f67f471-7a4c-4e61-8375-51aa7df4dd26",
            "name": "Pic_0002-5.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/ad7faade-33a5-4d15-b373-46a2767e8341_pic_0002-5.pdf",
            "status": "confirmed",
            "created_at": "2022-09-06T22:56:07.583+08:00",
            "updated_at": "2023-12-18T18:58:08.086+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": null,
            "is_classified": true,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": "Failed to open TCP connection to 20.222.35.101:8889 (Connection refused - connect(2) for 20.222.35.101:8889)",
            "retry_count": 1,
            "labels": [
                {
                    "id": "056b73e5-26cb-431e-8a42-fd77a8c1c511",
                    "name": "CHYB請假表"
                }
            ]
        },
        {
            "id": "91b9a423-f8b2-47f3-bf7d-dbe6d310b0ac",
            "name": "Pic_0002-1.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/fdf55e6c-38a0-4893-8ec1-06809094aba5_pic_0002-1.pdf",
            "status": "confirmed",
            "created_at": "2022-09-06T22:56:31.600+08:00",
            "updated_at": "2023-12-18T18:57:17.863+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": null,
            "is_classified": true,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": "Failed to open TCP connection to 20.222.35.101:8889 (Connection refused - connect(2) for 20.222.35.101:8889)",
            "retry_count": 1,
            "labels": [
                {
                    "id": "056b73e5-26cb-431e-8a42-fd77a8c1c511",
                    "name": "CHYB請假表"
                }
            ]
        },
        {
            "id": "b73684de-1ac2-4b21-8c75-4c81215fcbe7",
            "name": "35.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/23307f60-65f1-4491-ab05-89b45f078d5d_35.pdf",
            "status": "confirmed",
            "created_at": "2022-09-12T08:21:23.833+08:00",
            "updated_at": "2023-12-18T18:56:07.960+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": null,
            "is_classified": true,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": "Failed to open TCP connection to 20.222.35.101:8889 (Connection refused - connect(2) for 20.222.35.101:8889)",
            "retry_count": 1,
            "labels": [
                {
                    "id": "d26c0813-4e17-4ab3-8e38-055cee127b99",
                    "name": "CV"
                }
            ]
        },
        {
            "id": "4ecdaf82-36cd-4b07-84d0-40c343475aac",
            "name": "35.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/c4dc26d9-d8a4-4c77-94a8-d710e46a8590_35.pdf",
            "status": "confirmed",
            "created_at": "2022-09-13T22:44:08.466+08:00",
            "updated_at": "2023-12-18T18:55:21.389+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": null,
            "is_classified": true,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": "Failed to open TCP connection to 20.222.35.101:8889 (Connection refused - connect(2) for 20.222.35.101:8889)",
            "retry_count": 2,
            "labels": [
                {
                    "id": "d26c0813-4e17-4ab3-8e38-055cee127b99",
                    "name": "CV"
                }
            ]
        },
        {
            "id": "6cc1790f-6fe2-44f7-9848-7247570ea8e6",
            "name": "31.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/a64c63d3-6619-4038-bc00-e8c54e65d183_31.pdf",
            "status": "confirmed",
            "created_at": "2022-09-14T13:04:36.347+08:00",
            "updated_at": "2023-12-18T18:55:11.737+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": null,
            "is_classified": true,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": null,
            "retry_count": 0,
            "labels": [
                {
                    "id": "d26c0813-4e17-4ab3-8e38-055cee127b99",
                    "name": "CV"
                }
            ]
        },
        {
            "id": "554c9937-bc07-4f09-b365-5c1f03a06b51",
            "name": "33.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/b166e9e2-38a0-4924-b02f-b10afa090e92_33.pdf",
            "status": "confirmed",
            "created_at": "2022-09-14T13:04:40.179+08:00",
            "updated_at": "2023-12-18T18:54:15.374+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": null,
            "is_classified": true,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": "Failed to open TCP connection to 20.222.35.101:8889 (Connection refused - connect(2) for 20.222.35.101:8889)",
            "retry_count": 1,
            "labels": [
                {
                    "id": "d26c0813-4e17-4ab3-8e38-055cee127b99",
                    "name": "CV"
                }
            ]
        },
        {
            "id": "a0fa1db7-8c03-4073-87c1-2d867272cb03",
            "name": "34.pdf",
            "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/b74d0d1b-9199-42ed-b403-aa9f4cfa7877_34.pdf",
            "status": "confirmed",
            "created_at": "2022-09-14T13:04:41.814+08:00",
            "updated_at": "2023-12-18T18:54:08.883+08:00",
            "approval_status": "awaiting",
            "approval_user_id": null,
            "approval_at": null,
            "folder_id": null,
            "upload_local_path": null,
            "user_id": null,
            "is_classified": true,
            "is_document": true,
            "meta": {},
            "is_classifier_trained": true,
            "is_embedded": true,
            "error_message": "Failed to open TCP connection to 20.222.35.101:8889 (Connection refused - connect(2) for 20.222.35.101:8889)",
            "retry_count": 1,
            "labels": [
                {
                    "id": "d26c0813-4e17-4ab3-8e38-055cee127b99",
                    "name": "CV"
                }
            ]
        }
    ],
    "meta": {
        "current_page": 1,
        "next_page": 2,
        "prev_page": null,
        "total_pages": 17,
        "total_count": 645
    }
}

interface ViewProps {
    handleSelectedValue: any;
}
export default function DriveTable(props: ViewProps) {
    const {
        handleSelectedValue
    } = props;

    const router = useRouter();
    const [selectedValue, setSelectedValue] = React.useState<any>();

    return (
        <React.Fragment>
            <Sheet
                className="DriveContainer"
                variant="outlined"
                sx={{
                    display: { xs: 'none', sm: 'initial' },
                    width: '100%',
                    borderRadius: 'sm',
                    flexShrink: 1,
                    overflow: 'auto',
                    minHeight: 0
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    stickyHeader
                    hoverRow
                    sx={{
                        '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
                        '--Table-headerUnderlineThickness': '1px',
                        '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
                        '--TableCell-paddingY': '4px',
                        '--TableCell-paddingX': '8px'
                    }}
                >
                    <thead>
                        <tr>
                            <th
                                style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}
                            ></th>
                            <th style={{ width: 300, padding: '12px 6px' }}>名稱</th>
                            <th style={{ width: 200, padding: '12px 6px' }}>標籤</th>
                            <th style={{ width: 120, padding: '12px 6px' }}>更新日期</th>
                            <th style={{ width: 120, padding: '12px 6px' }}>擁有人</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {drives.folders.map((row: any) => (
                            <TableRow doc={row} type={'folders'} selectedValue={selectedValue} setSelectedValue={setSelectedValue} handleSelectedValue={handleSelectedValue} />
                        ))} */}
                        {drives.documents.map((row: any, index) => (
                            <TableRow key={index} doc={row} type={'documents'} selectedValue={selectedValue} setSelectedValue={setSelectedValue} handleSelectedValue={handleSelectedValue} />
                        ))}
                    </tbody>
                </Table>
            </Sheet>
        </React.Fragment>
    );
}
