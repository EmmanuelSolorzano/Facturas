import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

interface Empresa {
  name: string;
}

function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

// ... (imports y definición de Empresa e sleep)

export default function AutocompleteCustom(props: any) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly Empresa[]>([]);
  const [inputValue, setInputValue] = React.useState<string | null>(props.default ? props.default : '');
  const loading = open && options.length === 0;
  const [defaultInput, setDefaultInput] = React.useState<Empresa | null>({
    name: props.default ? props.default : ''
  });

  const handleInput = (event: React.ChangeEvent<{}>, value: string) => {
    setInputValue(value);
    updateOptions(value);
    props.handleChange(value);
    console.log("Input: ", value);
  };

  const updateOptions = async (value: string) => {
    let newOptions: Empresa[] = data;

    if (value.trim() !== '') {
      newOptions = data.filter((option: { name: string; }) =>
        option.name.toLowerCase().includes(value.toLowerCase())
      );
    }

    if (value.trim() !== '') {
      newOptions.unshift({ name: `${value}` });
    }
    setOptions(newOptions);
  };

  const data = props.who === 'Receptor' ? 
  [
    { name: 'Techno'},
    { name: 'Procarsol'},
    { name: 'Fraccionaria'},
    { name: 'TechSolutions'},
    { name: 'InnoTech'},
    { name: 'Globex'},
    { name: 'InnovateCorp'},
    { name: 'Soriana'},
    { name: 'Oxxo'},
    { name: 'Costco'},
  ]
  :
  [
    { name: 'Proveedor XYZ'},
    { name: 'Proveedor LMN'},
    { name: 'Proveedor ABC'},
    { name: 'LEY'},
    { name: 'Soriana'},
    { name: 'Oxxo'},
    { name: 'Costco'},
  ];

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        updateOptions(inputValue || ''); // Actualizar opciones al abrir
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, inputValue]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
    if (props.default) {
      setInputValue(props.default);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 200, border: 0, boxShadow: 'none', borderBlockColor: 'transparent' }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onInputChange={handleInput}
      defaultValue={defaultInput}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          className={`block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
            props.error ? 'ring-red-300 focus:ring-red-300' : 'ring-gray-300 focus:ring-indigo-600'
          }`}
          //variant='standard'
          size='small'
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
