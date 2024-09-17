import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import * as material from '@mui/material';
// utils
import { Demo, DemoRequest } from 'src/@types/demo';
// routes
import { dispatch } from 'src/redux/store';
import { addDemo, updateDemo } from 'src/redux/slices/demo';
import { format } from 'date-fns';
import { Box, Button, Card, Grid, Stack, TextField, Divider, Typography, MenuItem } from '@mui/material';
import * as paths from '../../routes/paths';
// @types
// assets
// components
import { useSnackbar } from '../../components/snackbar';
import FormProvider, { RHFEditor, RHFSelect, RHFTextField } from '../../components/hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/system';
import { current } from '@reduxjs/toolkit';
import Iconify from 'src/components/iconify';
import { grey } from '@mui/material/colors';
import { string } from 'yup/lib/locale';
// import './DemoDate.css';


// ----------------------------------------------------------------------

interface FormValuesProps extends Partial<Demo> {}

type Props = {
  isEdit?: boolean;
  currentDemo?: Demo;
};

export default function DemoNewEditForm(this: any, { isEdit = false, currentDemo }: Props) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    medicineCategory: Yup.string().required('medicineCategory is required'),
    medicineName: Yup.string().required('medicineName is required'),
    batchNo: Yup.string().required('Batch No is required'),
    mrp: Yup.string().required('MRP is required'),
    batchAmount: Yup.string().required('batchAmount is required'),
    salePrice: Yup.string().required('salePrice is required'),
    packingQuantity: Yup.string().required('packingQuantity is required'),
    quantity: Yup.string().required('quantity is required'),
    purchasePrice: Yup.string().required('purchasePrice is required'),
    tax: Yup.string().required('tax is required'),
    amount: Yup.string().required('amount is required'),
  });

  const defaultValues = useMemo(
    () => ({
      id: currentDemo?.id || '',
      medicineCategory: currentDemo?.medicineCategory || '',
      medicineName: currentDemo?.medicineName || '',
      batchNo: currentDemo?.batchNo || '',
      expiryDate: currentDemo?.expiryDate || '',
      salePrice: currentDemo?.salePrice,
      mrp: currentDemo?.mrp,
      batchAmount: currentDemo?.batchAmount ,
      packingQuantity: currentDemo?.packingQuantity ,
      quantity: currentDemo?.quantity,
      purchasePrice: currentDemo?.purchasePrice,
      tax: currentDemo?.tax,
      amount: currentDemo?.amount,
    }),
    [currentDemo]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: 'items',
  // });

  const handleAdd = () => {
    append({
      medicineCategory: '',
      medicineName: '',
      batchNo: '',
      mrp: '',
      batchAmount: 0,
      salePrice: 0,
      packingQuantity: 0,
      quantity: 0,
      purchasePrice: 0,
      tax: 0,
      amount: 0,
    });
  };
  
  const handleRemove = (index: number) => {
    remove(index);
  };


  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentDemo) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentDemo]);

  const handelTextAreaChange = (e: any) => {
    console.log(e);
  };
  const onSubmit = async (data: FormValuesProps) => {
    const request: DemoRequest = {
      // id: data.id,
      medicineCategory: data.medicineCategory,
      medicineName: data.medicineName,
      batchNo: data.batchNo,
      expiryDate: data.expiryDate,
      mrp: data.mrp,
      batchAmount: data.batchAmount,
      salePrice: data.salePrice,
      packingQuantity: data.packingQuantity,
      quantity: data.quantity,
      purchasePrice: data.purchasePrice,
      tax: data.tax,
      amount: data.amount,
      // createdDateTime: data.createdDateTime,
    };

    try {
      if (isEdit && currentDemo) {
        request.id = data.id;
        dispatch(updateDemo(request));
      }
      if (!isEdit) {
        dispatch(addDemo(request));
        reset();
      }
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(paths.PATH_DASHBOARD.demo.list);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const STATUS_OPTIONS = ['Mohan Medicals', 'Dr.pharmacy', 'Apollo Pharmacy', 'Ajay Medicals','CarePharmacy'];
  const MEDICINE_OPTIONS = ['Syrup', 'Tablets', 'Jullys', 'Chewable Drugs','celline'];
  const PAYMENTMETHOD_OPTIONS = ['cash', 'card', 'upi', 'NetBanking',];
  const datetimeLabel = document.getElementById('datetime-label');

  function append(arg0: { medicineCategory: string; medicineName: string; batchNo: string; mrp: string; batchAmount: number; salePrice: number; packingQuantity: number; quantity: number; purchasePrice: number; tax: number; amount: number; }) {
    throw new Error('Function not implemented.');
  }
  function remove(index: number) {
    throw new Error('Function not implemented.');
  }

   return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={8}>
        <Grid item xs={11} md={8} spacing={2}>

          <Card sx={{ p: 3, minWidth: 1180,  bgcolor: 'background.neutral' }}>
            <Box sx={{display: 'grid',columnGap: 2,rowGap: 2,gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 2fr)',}, }}
            >
              <div>
              <label htmlFor="Bill No#"><strong>Bill No#12313</strong></label>    
            
                <p><strong>Date:{currentDate}:{currentTime}</strong></p>
                </div>
                            
         </Box>
       </Card>

        <Card sx={{ p: 2, minWidth: 1200}}>
       <Box sx={{display: 'grid', columnGap: 1, rowGap: 3, gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(14, 1fr)' },}}
         >
         <div> 
         
         <label htmlFor="medicineCategory">MedicineCategory*</label>
        <RHFSelect fullWidth name="medicineCategory" label="syrup" InputLabelProps={{ shrink: true }}>
        {MEDICINE_OPTIONS.map((option) => (
          <MenuItem key={option} value={option}>
            {option} 
           </MenuItem>
         ))} 
         </RHFSelect>
        </div>
       <div>
       <label htmlFor="medicineName">MedicineName*</label>
       <RHFTextField id="medicineCategory" type="text" name="medicineName" />
       </div>

        <div>
         <label htmlFor="batchNo">BatchNo*</label>
          <RHFTextField id="batchNo"type="text"name="batchNo" />
          </div>
        <div>
         <label htmlFor="mrp">Mrp($)*</label>
          <RHFTextField id="mrp"type="text"name="mrp" />
          </div>
        
          <div>
       <label htmlFor="batchAmount">BatchAmount*</label>
       <RHFTextField id="batchAmount" type="text" name="batchAmount"/>
        </div>
        <div>
       <label htmlFor="salePrice">SalePrice*</label>
       <RHFTextField id="salePrice" type="text" name="salePrice" />
       </div>

       <div>
       <label htmlFor="packingQuantity">PackingQty*</label>
       <RHFTextField id="packingQuantity" type="text" name="packingQuantity" />
       </div>

       <div>
       <label htmlFor="quantity">Quantity*</label>
       <RHFTextField id="quantity" type="text" name="quantity" />
       </div>

       <div>
       <label htmlFor="purchasePrice">PurchasePrice$*</label>
       <RHFTextField id="purchasePrice" type="text" name="purchasePrice" />
       </div>

       <div>
       <label htmlFor="tax">Tax%*</label>
       <RHFTextField id="tax" type="text" name="tax" />
       </div>
      
       <div>
        <label htmlFor="expiryDate">ExpiryDate*</label>
        <RHFTextField id="expiryDate"type="text"name="expiryDate" />
        </div>

        <div>
        <label htmlFor="amount">Amount*</label>
        <RHFTextField id="amount"type="integer"name="amount" />
        </div>
        
        <Stack spacing={3} alignItems="center" direction={{xs: 'column',md: 'row',}} sx={{ px: 2.5, py: 3 }}>
        <div>
        <Button
          size="small"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleAdd}
          sx={{ flexShrink: 0 }}
        >
        </Button>
        
        <Button
              size="small"
              color="error"
              startIcon={<Iconify icon="eva:trash-2-outline" />}
              // onClick={() => handleRemove(index)}
            >
            </Button>
            </div>
          </Stack>
       </Box>
      </Card> 

      {/* <Card sx={{ p:5, minWidth: 1180}}>   */}
   <Box sx={{ display: 'grid', columnGap: 2, rowGap: 6, gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(5, 1fr)' },}}
  >
    <Stack
    spacing={2}
      alignItems="center"
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{ px: 2.5, py: 3 }}
    >
      <div>
         <label htmlFor="Supplier Name">Supplier Name</label>
        <RHFSelect fullWidth name="Supplier Name" label="" InputLabelProps={{ shrink: true }} >
        {STATUS_OPTIONS.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))} 
      </RHFSelect>
        
      <label htmlFor="note">Note</label>
      <RHFTextField id="note" type="text" name="note"multiline rows={2}  style={{ width: '400px', height: '100px' }}/>
       
      <label htmlFor="AttachDocument">AttachDocument</label>
      <RHFTextField id="AttachDocument" type="AttachDocument" multiline rows={2}  label="Drop file here or click" name="note" />
      </div>
      </Stack>

      <Stack
      spacing={2}
      direction={{ xs: 'column-reverse', md: 'row' }}
      alignItems={{ xs: 'flex-start', md: 'center' }}
      >
       </Stack>
        <material.Divider sx={{ my: 3, borderStyle: 'dashed' }} />
       <material.Button size="small"
        // startIcon={<Iconify icon="eva:plus-fill" />}                
        // onClick={handleAdd}                
        sx={{ flexShrink: 0 }}
         >
           </material.Button>
  
    <Stack
    spacing={5}
    direction={{ xs: 'column-reverse', md: 'column' }} 
    alignItems={{ xs: 'flex-end', md: 'flex-end' }} 
    >
    <Stack spacing={2} sx={{ mt: 3 }}
    >
    <Stack direction="row" justifyContent="flex-start">
      
      <material.Typography variant="h6">TotalAmount:</material.Typography>
      <material.Typography sx={{ textAlign: 'right', width: 120 }}
      > 
      {/* {fCurrency(sum(totalOnRow)) || '-'} */}
      </material.Typography>
      </Stack>
      <Stack direction="row" justifyContent="flex-start">
      <material.Typography variant="h6">Discount:</material.Typography> 
      <material.Typography sx={{ textAlign: 'right', width: 120,}}
       >
       {/* {values.discount ? `- ${fCurrency(values.discount)}` : '-'}  */} 
       </material.Typography>
       </Stack>
       <Stack direction="row" justifyContent="flex-start">
       <material.Typography variant="h6">Tax:</material.Typography> 
       <material.Typography sx={{ textAlign: 'right', width: 120 }}>
       {/* {values.taxes ? fCurrency(values.taxes) : '-'} */}
       </material.Typography> 
       </Stack> 
       <Stack direction="row" justifyContent="flex-start">
       <material.Typography variant="h6">NetAmount:</material.Typography>
       <material.Typography sx={{ textAlign: 'right', width: 120 }}
       > 
       {/* {values.taxes ? fCurrency(values.taxes) : '-'} */} 
       </material.Typography>
       </Stack>
       <Stack alignItems="flex-center" direction='row' spacing={5} sx={{ mt: 3 }}>
       <div> 
        <label htmlFor="PaymentMethod"><strong>PaymentMethod*</strong></label>
        <RHFSelect fullWidth name="paymentmethod" InputLabelProps={{ shrink: true }} sx={{ width: 130 }} 
        >
        {PAYMENTMETHOD_OPTIONS.map((option) => ( 
        <MenuItem key={option} value={option}>{option} 
        </MenuItem> ))}
        </RHFSelect> 
        </div>
        <div> 
          <label htmlFor="PayAmount"><strong>PayAmount*</strong></label>
          <RHFTextField id="PayAmount" type="integers" name="balance" sx={{ width: 130 }} /> 
          </div>
          </Stack>
          </Stack> 
          </Stack> 
          </Box>
          {/* </Card> */}

<Stack alignItems="flex-end" direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 3,ml: 20 }}>
  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
    {!isEdit ? 'Calculate' : 'Save Changes'}
  </LoadingButton>
  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
    {'Save'}
  </LoadingButton>
</Stack>
{/* </Box>  */}
</Grid>
</Grid>
</FormProvider>

);
}
