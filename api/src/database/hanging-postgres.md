Check if Postgres is still running

```

Get-Process postgres

```





Find who owns the file



Windows has a built-in utility called handle.exe from Microsoft's Sysinternals suite:



```

handle.exe postgres

```



or



```

handle.exe postmaster.pid

```





Resource Monitor



Open:



```

resmon.exe

```



Go to:



```

CPU

```



Search Associated Handles.



Type:



```

postgres

```



or



```

postmaster.pid

```



You'll immediately see which process owns it.



Restart the PostgreSQL service



Instead of rebooting:



```

net stop postgresql-x64-17

net start postgresql-x64-17

```



or

```

Restart-Service postgresql-x64-17

```









