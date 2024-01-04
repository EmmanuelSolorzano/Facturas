import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#CA8A04',
    },
    secondary: {
      main: '#4F46E5',
    }
  },
});

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
  const initial = props.default ? props.default : '';
  const [defaultInput, setDefaultInput] = React.useState<Empresa | null>({
    name: props.default ? props.default : ''
  });

  const handleInput = (event: React.ChangeEvent<{}>, value: string) => {
    setInputValue(value);
    updateOptions(value);
    props.handleChange(value);
    console.log("Input: ", value);
    console.log("Default: ", props.default);
  };

  const updateOptions = async (value: string) => {
    let newOptions: Empresa[] = data;

    if (value.trim() !== '' && inputValue !== data[0].name) {

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
    <ThemeProvider theme={theme}>
    <Autocomplete
      id="asynchronous-demo"

      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      autoComplete={true}
      autoCapitalize='true'
      onInputChange={handleInput}
      defaultValue={defaultInput}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        
        <TextField
          {...params}
          error={props.error}
          //variant='standard'
          size='small'
          color={props.update && (initial !== inputValue) ? 'primary' : 'secondary'}
          margin='dense'
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
    </ThemeProvider>
  );
}
