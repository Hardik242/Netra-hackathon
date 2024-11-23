// export default function Extra() {
//     return (
//         <>
//             <div className="flex gap-1 sm:gap-2 items-center justify-center md:justify-end">
//                 <Select
//                     size="sm"
//                     className="max-w-48"
//                     label="Filter by"
//                     placeholder="Model">
//                     {modelMenuItems.map((item) => (
//                         <SelectItem key={crypto.randomUUID()}>
//                             {item}
//                         </SelectItem>
//                     ))}
//                 </Select>

//                 <Select
//                     size="sm"
//                     className="max-w-48"
//                     label="Filter by"
//                     placeholder="Type">
//                     {typeMenuItems.map((item) => (
//                         <SelectItem key={crypto.randomUUID()}>
//                             {item}
//                         </SelectItem>
//                     ))}
//                 </Select>
//             </div>

//             <Table selectionMode="multiple" shadow="md" color="primary">
//                 <TableHeader className="bg-slate-500">
//                     <TableColumn key={crypto.randomUUID()}>Image</TableColumn>
//                     <TableColumn key={crypto.randomUUID()}>Serial</TableColumn>
//                     <TableColumn key={crypto.randomUUID()}>Model</TableColumn>
//                     <TableColumn key={crypto.randomUUID()}>Type</TableColumn>
//                     <TableColumn key={crypto.randomUUID()}>
//                         Issued on
//                     </TableColumn>
//                 </TableHeader>

//                 <TableBody>
//                     {weapons.map((weapon) => (
//                         <TableRow key={crypto.randomUUID()}>
//                             <TableCell key={crypto.randomUUID()}>
//                                 <Image
//                                     src={weapon.image}
//                                     width={80}
//                                     height={80}
//                                     className="aspect-square object-contain"
//                                     alt={weapon.model}
//                                 />
//                             </TableCell>

//                             <TableCell key={crypto.randomUUID()}>
//                                 {weapon.serialNumber}
//                             </TableCell>

//                             <TableCell key={crypto.randomUUID()}>
//                                 {weapon.model}
//                             </TableCell>

//                             <TableCell key={crypto.randomUUID()}>
//                                 {weapon.type}
//                             </TableCell>

//                             <TableCell key={crypto.randomUUID()}>
//                                 {new Date().toLocaleDateString()}
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>

//             <Card className="px-3 py-3 gap-3 justify-between flex-row items-center">
//                 <span className="text-sm text-stone-600">
//                     0 of {weapons.length} selected
//                 </span>
//                 <ReturnButton />
//             </Card>
//         </>
//     );
// }
