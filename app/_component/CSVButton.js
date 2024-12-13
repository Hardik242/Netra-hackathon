"use client";

import {ArrowDownOnSquareIcon} from "@heroicons/react/24/solid";
import {Button} from "@nextui-org/react";
import {CSVLink} from "react-csv";
import {formatDateTime} from "../_services/helpers";
import {useMemo} from "react";

export default function CSVButton({data}) {
    let finalData = useMemo(
        () =>
            data.map((record) => {
                const {
                    id,
                    created_at,
                    transactionType: type,
                    weaponId,
                } = record;
                const {shortDate, shortTime} = formatDateTime(created_at);
                return {
                    Id: id,
                    Date: shortDate,
                    Time: shortTime,
                    Transaction_Type: type,
                    Weapon_Serial_Number: weaponId,
                };
            }),
        [data]
    );

    return (
        <CSVLink data={finalData} filename="records">
            <Button
                color="primary"
                className="py-2 px-2 sm:text-sm sm:py-4 sm:px-4"
                size="sm">
                <span>
                    <ArrowDownOnSquareIcon className="size-4 sm:size-5 text-white" />
                </span>
                Export as CSV
            </Button>
        </CSVLink>
    );
}
